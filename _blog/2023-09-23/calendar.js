import { renderMegaCalendar } from './mega_calendar.js';
import { update_calendar, fetchAndReadFile } from './traffic.js';

const host = document.getElementById('shadowHost');
const shadowRoot = host.attachShadow({ mode: 'open' });

const template = document.getElementById('shadowTemplate').content.cloneNode(true);
shadowRoot.appendChild(template);

// const shadowRoot = document.getElementById("shadowHost").shadowRoot;

console.log("shadow Root is ", shadowRoot);

let daysTagAll = shadowRoot.querySelectorAll(".calendar-month .calendar .days"),
  currentDateTagAll = shadowRoot.querySelectorAll(".calendar-month .current-date"),
  prevNextIcon = shadowRoot.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function dateToId(date) {
  return `_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const renderCalendar_ = (year, daysTag, currentDateTag) => {
  let firstDayofMonth = new Date(year, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(year, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(year, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(year, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    const id = dateToId(
      new Date(year, currMonth - 1, lastDateofLastMonth - i + 1)
    );
    liTag += `<li class="inactive" id="${id}" data-after="???">${
      lastDateofLastMonth - i + 1
    }</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "active"
        : "";
    const id = dateToId(new Date(year, currMonth, i));
    liTag += `<li class="${isToday}" id="${id}" data-after="???">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    const id = dateToId(new Date(year, currMonth + 1, i - lastDayofMonth + 1));
    liTag += `<li class="inactive" id="${id}" data-after="???">${
      i - lastDayofMonth + 1
    }</li>`;
  }

  currentDateTag.innerText = `${months[currMonth]} ${year}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
const renderCalendar = () => {
  for (let i = 0; i < daysTagAll.length; i++) {
    renderCalendar_(currYear - i, daysTagAll[i], currentDateTagAll[i]);
  }
  update_calendar(); // See traffic.js
};

async function initialize() {
  await fetchAndReadFile(); // Initialize calendar with tsv file
  renderCalendar();
  showAll();
}
document.addEventListener('DOMContentLoaded', () => {
  initialize();
});

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    switch (icon.id) {
      case "prev":
        currMonth--;
        break;
      case "next":
        currMonth++;
        break;
      case "today":
        currYear = date.getFullYear();
        currMonth = date.getMonth();
        break;
    }

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }

    renderCalendar(); // calling renderCalendar function
  });
});

function centerScroll() {
  const root = document.getElementById("shadowHost").shadowRoot;
  var scrollContainer = root.getElementById("calendars-container");
  var scrollWidth = scrollContainer.scrollWidth;
  var clientWidth = scrollContainer.clientWidth;

  console.log("scrollwidth: ", scrollWidth, " clientWidth: ", clientWidth);

  // Set the scroll position to the center
  // scrollContainer.scrollLeft = (scrollWidth - clientWidth) / 2;
  scrollContainer.scrollLeft = 300;
}
centerScroll();

const MONTH_TO_KEEP = 1;
function show1month1year() {
  shadowRoot.querySelector(".mega-calendar-container").classList.add("hidden");
  shadowRoot.querySelector(".mega-calendar-container-below").classList.add("hidden");
  shadowRoot.querySelector(".calendar-container").classList.remove("hidden");
  shadowRoot.querySelector(".calendar-container-below").classList.remove("hidden");

  const all_months = shadowRoot.querySelectorAll(".calendar-month");
  for (let i = 0; i < daysTagAll.length; i++) {
    if (i == MONTH_TO_KEEP) continue;
    all_months[i].style.display = "none";
  }
  all_months[MONTH_TO_KEEP].style.margin = "auto";
}
function show1monthAllYears() {
  shadowRoot.querySelector(".mega-calendar-container").classList.add("hidden");
  shadowRoot.querySelector(".mega-calendar-container-below").classList.add("hidden");
  shadowRoot.querySelector(".calendar-container").classList.remove("hidden");
  shadowRoot.querySelector(".calendar-container-below").classList.remove("hidden");

  const all_months = shadowRoot.querySelectorAll(".calendar-month");
  all_months[MONTH_TO_KEEP].style.margin = "0";
  for (let i = 0; i < daysTagAll.length; i++) {
    if (i == MONTH_TO_KEEP) continue;
    all_months[i].style.display = "block";
  }
  centerScroll();
}
function showAll() {
  shadowRoot.querySelector(".mega-calendar-container").classList.remove("hidden");
  shadowRoot.querySelector(".mega-calendar-container-below").classList.remove("hidden");
  shadowRoot.querySelector(".calendar-container").classList.add("hidden");
  shadowRoot.querySelector(".calendar-container-below").classList.add("hidden");
  renderMegaCalendar();
}

export { show1month1year, show1monthAllYears, showAll, renderCalendar };
window.show1month1year = show1month1year;
window.show1monthAllYears = show1monthAllYears;
window.showAll = showAll;
window.update_calendar = update_calendar;
