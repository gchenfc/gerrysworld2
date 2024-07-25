function findIgnoreColumnsRows() {
  const ignoreColumns = [], ignoreRows = [];
  for (const sortButton of document.querySelectorAll('.sort-button')) {
    if (sortButton.getAttribute('data-sort-direction') === 'none') {
      const id = sortButton.id;
      if (id.startsWith('sortDirection_ROW')) {
        ignoreRows.push(parseInt(id.slice(17)));
      } else if (id.startsWith('sortDirection_COL')) {
        ignoreColumns.push(parseInt(id.slice(17)));
      }
    }
  }
  for (const checkbox of document.querySelectorAll('input[type="checkbox"].ignore')) {
    if (!checkbox.checked) {
      const id = checkbox.id;
      if (id.startsWith('ignore_ROW')) {
        ignoreRows.push(parseInt(id.slice(10)));
      } else if (id.startsWith('ignore_COL')) {
        ignoreColumns.push(parseInt(id.slice(10)));
      }
    }
  }
  return [ignoreColumns, ignoreRows];
}
function processTable() {
  const inputTable = document.getElementById('inputTable').value;
  const colorizeByRow = document.getElementById('colorizeByRow').checked;
  const colorizeByColumn = document.getElementById('colorizeByColumn').checked;
  const colorizeByAll = document.getElementById('colorizeByAll').checked;
  // const ignoreColumns = document.getElementById('ignoreColumns').value.split(',').map(num => parseInt(num.trim()) - 1).filter(num => !isNaN(num));
  // const ignoreRows = document.getElementById('ignoreRows').value.split(',').map(num => parseInt(num.trim()) - 1).filter(num => !isNaN(num));
  const scalingFunction = document.getElementById('scalingFunction').value;
  const customFunctionCode = document.getElementById('customFunctionCode').value;
  const isAlignAmpersands = document.getElementById('alignAmpersands').checked;

  const [ignoreColumns, ignoreRows] = findIgnoreColumnsRows();

  // scaling function converts number to a scalar from [0, 1]
  const NORMALIZE = (value, min, max) => (value - min) / (max - min);
  const scalingFun = {
    linear: (x) => x,
    power2: (x) => x ** 2,
    power3: (x) => x ** 3,
    custom: new Function('x', customFunctionCode),
  }[scalingFunction];

  // Parse the input table
  const rows = inputTable.split('\\\\').map(row => row.split('&').map(cell => cell.trim()));
  const numRows = rows.length;
  const numCols = rows[0].length;

  // Convert strings to floats
  let table = [];
  for (let i = 0; i < numRows; i++) {
    table.push([]);
    for (let j = 0; j < numCols; j++) {
      if (rows[i][j] === undefined) {
        table[i].push(undefined);
        continue;
      }
      const value = parseFloat(rows[i][j].replace(/[^0-9.-]/g, ''));
      if (ignoreRows.includes(i) || ignoreColumns.includes(j) || isNaN(value)) {
        table[i].push(undefined);
      } else {
        table[i].push(value);
      }
    }
  }
  // Compute min and max for each cell in the table
  let per_cell_min = [], per_cell_max = [], per_cell_dir = [];
  for (let i = 0; i < numRows; i++) {
    per_cell_min.push([]);
    per_cell_max.push([]);
    per_cell_dir.push([]);
    for (let j = 0; j < numCols; j++) {
      per_cell_min[i].push(Infinity);
      per_cell_max[i].push(-Infinity);
      per_cell_dir[i].push('none');
    }
  }
  let min, max;
  if (colorizeByRow) {
    for (let i = 0; i < numRows; i++) {
      min = Math.min(...table[i].filter(value => value !== undefined));
      max = Math.max(...table[i].filter(value => value !== undefined));
      for (let j = 0; j < numCols; j++) {
        per_cell_min[i][j] = min;
        per_cell_max[i][j] = max;
        per_cell_dir[i][j] = document.getElementById(`sortDirection_ROW${i}`).getAttribute('data-sort-direction');
      }
    }
  } else if (colorizeByColumn) {
    for (let j = 0; j < numCols; j++) {
      let col = table.map(row => row[j]).filter(cell => cell !== undefined);
      min = Math.min(...col);
      max = Math.max(...col);
      for (let i = 0; i < numRows; i++) {
        per_cell_min[i][j] = min;
        per_cell_max[i][j] = max;
        per_cell_dir[i][j] = document.getElementById(`sortDirection_COL${j}`).getAttribute('data-sort-direction');
      }
    }
  } else if (colorizeByAll) {
    let allCells = table.flat().filter(cell => cell !== undefined);
    min = Math.min(...allCells);
    max = Math.max(...allCells);
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        per_cell_min[i][j] = min;
        per_cell_max[i][j] = max;
        per_cell_dir[i][j] = document.getElementById('sortDirection_corner').getAttribute('data-sort-direction');
      }
    }
  }

  // Output the processed table
  let processedTable = rows.map((row, rowIndex) => {
    if (ignoreRows.includes(rowIndex)) {
      return row.join(' & ');
    }
    return row.map((cell, colIndex) => {
      if (ignoreColumns.includes(colIndex)) {
        return cell;
      }
      let value = table[rowIndex][colIndex];
      if (value === undefined) return cell;
      const x = NORMALIZE(value, per_cell_min[rowIndex][colIndex], per_cell_max[rowIndex][colIndex]);
      switch (per_cell_dir[rowIndex][colIndex]) {
        case 'asc':
          value = scalingFun(x);
          break;
        case 'desc':
          value = scalingFun(1 - x);
          break;
        case 'none':
          return cell;
      }
      const color = `green!${Math.min(Math.max(value * 100, 0), 100).toFixed(0)}`;
      return `\\cellcolor{${color}}${cell}`;
    }).join(' & ');
  }).join('\\\\\n');

  // Align the ampersands
  if (isAlignAmpersands) {
    processedTable = alignAmpersands(processedTable);
  }

  document.getElementById('outputTable').value = processedTable;

  // Render the LaTeX table
  renderLaTeX(processedTable);
}

// Function to align ampersands
function alignAmpersands(table) {
  const rows = table.split('\\\\\n');
  const splitRows = rows.map(row => row.split(' & '));
  const colWidths = [];

  splitRows.forEach(row => {
    row.forEach((cell, colIndex) => {
      colWidths[colIndex] = Math.max(colWidths[colIndex] || 0, cell.length);
    });
  });

  return splitRows.map(row => {
    return row.map((cell, colIndex) => {
      return cell.padEnd(colWidths[colIndex], ' ');
    }).join(' & ');
  }).join('\\\\\n');
}

// Function to render LaTeX using MathJax
function renderLaTeX(latexCode) {
  const renderedTableDiv = document.getElementById('renderedTable');
  // renderedTableDiv.innerHTML = `\$begin:math:display$ \\\\begin{array}{l} ${latexCode} \\\\end{array} \\$end:math:display$`;
  let str = `\$\$ \\begin{array}{ccccccccccccccccccccccccc}\n${latexCode}\n\\end{array} \$\$`;
  // Replace `{green!##}` with `{rgb(255 ## 255)}
  str = str.replace(/\\cellcolor{green!([0-9]+)}/g, (_, p1) => {
    const green = parseInt(p1) / 100;
    const WHITE = [255, 255, 255];
    const GREEN = [148.6, 255., 83.0]; // 00A64F
    const color = WHITE.map((w, i) => w * (1 - green) + GREEN[i] * (green)).map(
      c => Math.min(255, Math.max(0, Math.round(c))) / 255
    );
    return `\\cellcolor[rgb]{${color.join(',')}}`;
  });
  renderedTableDiv.innerHTML = str;
  console.log(renderedTableDiv.innerHTML);
  console.log("Begin typesetting")
  MathJax.typeset([renderedTableDiv]);
  console.log("Done typesetting")
  // MathJax.typesetPromise([renderedTableDiv]);
}

const DIR_SELECT = `<button class="sort-button" data-sort-direction="asc" onclick="cycleSortDirection(this); processTable()" id="sortDirection_INDEX">&#8593;</button>`
const OK_SELECT = `<input type="checkbox" class="ignore" id="ignore_INDEX" onclick="processTable()" checked>`

function cycleSortDirection(button, forceIndex = null) {
  const directions = ['none', 'asc', 'desc'];
  const symbols = ['', '&#8593;', '&#8595;'];
  let currentDirection = button.getAttribute('data-sort-direction');
  let nextIndex = (directions.indexOf(currentDirection) + 1) % directions.length;
  if (forceIndex !== null) nextIndex = forceIndex;
  button.setAttribute('data-sort-direction', directions[nextIndex]);
  button.innerHTML = symbols[nextIndex];
}

function updatePreview() {
  const colorizeByRow = document.getElementById('colorizeByRow').checked;
  const colorizeByColumn = document.getElementById('colorizeByColumn').checked;
  const colorizeByAll = document.getElementById('colorizeByAll').checked;
  const col_sel = colorizeByColumn ? DIR_SELECT : OK_SELECT;
  const row_sel = colorizeByRow ? DIR_SELECT : OK_SELECT;
  const corner_sel = colorizeByAll ? DIR_SELECT : '';

  const inputTable = document.getElementById('inputTable').value;
  const rows = inputTable.split('\\\\').map(row => row.split('&').map(cell => cell.trim()));
  const numRows = rows.length;
  const numCols = rows[0].length;

  let previewTableHtml = '<table><thead><tr>';
  previewTableHtml += `<th>${corner_sel.replace('INDEX', 'corner')}</th>`;
  for (let colIndex = 0; colIndex < numCols; colIndex++) {
    previewTableHtml += `<th>${col_sel.replace('INDEX', 'COL' + colIndex)}</th>`;
  }
  previewTableHtml += '</tr></thead><tbody>';

  rows.forEach((row, rowIndex) => {
    previewTableHtml += '<tr>';
    previewTableHtml += `<td>${row_sel.replace('INDEX', 'ROW' + rowIndex)}</td>`;
    row.forEach(cell => {
      previewTableHtml += `<td>${cell}</td>`;
    });
    previewTableHtml += '</tr>';
  });

  previewTableHtml += '</tbody></table>';
  document.getElementById('previewTableContainer').innerHTML = previewTableHtml;
}
