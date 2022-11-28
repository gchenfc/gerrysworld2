function update() {
  // update URDB labels
  var selects = document.getElementsByTagName('select');
  for (var select of selects) {
    var label = document.getElementById(select.id.replace('select', 'label'));
    label.innerHTML = select.value;
  }
  // copy output to another auxilliary table
  var output = document.getElementById('output');
  output.innerHTML = '<tr><th>cbsa</th><th>City</th><th>Utility Name</th><th>Utility Rate</th><th>URDB ID</th></tr>';
  for (var select of selects) {
    const source_row = document.getElementById(select.id.replace('select', 'row'));
    var row = document.createElement('tr');
    row.appendChild(source_row.children[0].cloneNode(true));
    row.appendChild(source_row.children[1].cloneNode(true));
    row.appendChild(source_row.children[2].cloneNode(true));
    var v = document.createElement('td');
    v.innerHTML = select.children[select.selectedIndex].innerHTML;
    row.appendChild(v);
    row.appendChild(source_row.children[4].cloneNode(true));
    output.appendChild(row);
  }
  copyTable();
}

// https://stackoverflow.com/a/42210996/9151520
function copyTable(el) {
  el = document.getElementById('output').parentElement;
  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();
    sel.removeAllRanges();
    try {
      range.selectNodeContents(el);
      sel.addRange(range);
    } catch (e) {
      range.selectNode(el);
      sel.addRange(range);
    }
    document.execCommand("copy");
    sel.empty();
  } else {
    alert('There was an error copying the text. Please manually copy-paste the table.');
  }
}

document.addEventListener('onload', function () {
  update();
})
