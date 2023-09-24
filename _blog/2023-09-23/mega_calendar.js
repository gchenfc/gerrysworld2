import { update_calendar } from "./traffic.js";

function dateToId(date) {
  return `_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const renderMegaCalendar_ = (year, daysTag, currentDateTag) => {
  let firstDayofYear = new Date(year, 0, 1).getDay(), // getting first day of month
    lastDayofYear = new Date(year, 11, 31).getDay(); // getting last day of month
  let liTag = "";

  let dayOfTheWeek = 0;

  for (let i = firstDayofYear; i > 0; i--) {
    // creating li of previous month last days
    const today = new Date(year, 0, 1 - i);
    const id = dateToId(today);
    // liTag += `<li class="inactive" id="${id}" data-after="???">${today.getDate()}</li>`;
    liTag += `<li></li>`;
  }

  let today = new Date(year, 0, 1);
  while (today.getFullYear() === year) {
    // if (today.getDate() === 1) {
    //   for (let i = today.getDay(); i < 7 && i != 0 && today.getMonth() != 0; i++) {
    //     liTag += `<li></li>`;
    //   }
    //   liTag += `<li class="month">${months[today.getMonth()]}</li>`;
    //   for (let i = 0; i < today.getDay(); i++) {
    //     liTag += `<li></li>`;
    //   }
    // }
    // if (today.getMonth() > 0 && today.getDay() === 0 && today.getDate() <= 7) {
    //   liTag += `<li class="break"></li>`;
    // }

    const isToday = today == new Date() ? "active" : "";
    const isFirstWeek =
      today.getMonth() > 0 && today.getDate() <= 7 ? "firstweek" : "";
    const isFirstDay =
      today.getMonth() > 0 && today.getDate() == 1 && today.getDay() != 0
        ? "firstday"
        : "";
    const id = dateToId(today);
    liTag += `<li class="${isToday} ${isFirstWeek} ${isFirstDay}" id="${id}" data-after="???">${today.getDate()}</li>`;

    today = addDays(today, 1);
  }

  // for (let i = lastDayofMonth; i < 6; i++) {
  //   // creating li of next month first days
  //   const id = dateToId(new Date(year, currMonth + 1, i - lastDayofMonth + 1));
  //   liTag += `<li class="inactive" id="${id}" data-after="???">${
  //     i - lastDayofMonth + 1
  //   }</li>`;
  // }

  currentDateTag.innerText = `${year}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
const renderMegaCalendar = () => {
  const shadowRoot = document.getElementById("shadowHost").shadowRoot;
  // First clone the calendar to ge all the years
  const calendars = shadowRoot.querySelector("#allMonthsAllYears");
  if (calendars.children.length == 1) {
    for (let i = 0; i < 4; ++i) {
      const template = calendars.children[0];
      console.log(template);
      const clone = template.cloneNode(true);
      calendars.appendChild(clone);
    }
  }

  // Get all the calendar day & currentDate elements
  const daysTagAll1 = shadowRoot.querySelectorAll(
    "#allMonthsAllYears .mega-calendar .days"
  );
  const currentDateTagAll1 = shadowRoot.querySelectorAll(
    "#allMonthsAllYears .mega-calendar .current-date"
  );

  // Now render the calendar for each year
  const currYear = new Date().getFullYear();
  for (let i = 0; i < daysTagAll1.length; i++) {
    renderMegaCalendar_(currYear - daysTagAll1.length + i + 1, daysTagAll1[i], currentDateTagAll1[i]);
  }
  update_calendar(); // See traffic.js
};

export { renderMegaCalendar };
