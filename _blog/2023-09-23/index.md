---
title: "Busiest Air Travel Days Calendar"
postType: "random"
description: "TSA publishes a table for the number of air passengers by day in the US. I've converted it to a calendar form for easier reading."
date: Sept 23, 2023
stylesheets: ["/css/blogPost.css", "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"]
---

TSA publishes a [table](https://www.tsa.gov/travel/passenger-volumes) for the historical number of air passengers by day in the US. I've converted it to a calendar form for easier reading.

Source: [TSA](https://www.tsa.gov/travel/passenger-volumes)

<div class="wrap-collapsible">
  <input id="why" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="why" class="lbl-toggle h2">Why?</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

You may want to avoid traveling during the busiest days of the year to avoid long lines and crowded airports.
Busy-ness may also be a proxy for how expensive flights are and how early in advance you should book tickets.
This calendar makes it easy to see which days have been historically the busiest.

Several other sites have visualized this data in different ways, but I found them much more difficult to read for choosing specific travel days as they seem more geared towards showing trends over time vs inspecting individual dates.  e.g. [Statistica](https://www.statista.com/statistics/1107016/coronavirus-tsa-checkpoint-travel-numbers-us-airports/), [r/DataIsBeautiful](https://www.reddit.com/r/dataisbeautiful/comments/r32pij/tsa_checkpoint_travel_numbers_current_year_versus/).

See also the source data at [TSA](https://www.tsa.gov/travel/passenger-volumes).

</div>
  </div>
</div>

<div class="wrap-collapsible">
  <input id="day-vs-date" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="day-vs-date" class="lbl-toggle h2">Day vs Date Disclaimer</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

The TSA site states "current year versus prior year(s)/same weekday", which is rather vague.

The way I interpreted this is that they match the current year date to the nearest past-year date larger than the current year date with the same day-of-the-week.  So for example, Jan 1, 2023 is a Sunday.  The nearest matches the previous year would be Dec 26, 2021 and Jan 2, 2022.  I assume it always matches "upward" to Jan 2, 2022.  Spot-checking for days like Christmas (uncharacteristically low travel on the same date each year) seems to support this, but it's plausible it could be wrong.

</div>
  </div>
</div>

<div class="wrap-collapsible">
  <input id="latest-data" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="latest-data" class="lbl-toggle h3">Getting the latest data (After Sept 21, 2023)</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

The calendar is based on me copy-pasting the TSA table on Sept 23, 2023, which has data up to Sept 21, 2023.
To visualize the latest data, you can do the following:

1. Go to [tsa.gov/travel/passenger-volumes](https://www.tsa.gov/travel/passenger-volumes)
2. Copy the whole table from (and including) the header row "Date" to the last row.
3. Click here: <button id="parseClipboard">Paste Clipboard</button>

---

The reason I don't automatically update the calendar based on the latest TSA data is because (1) I don't want to constantly access TSA's website with my server which might cause suspicion, and (2) my site accessing TSA through your browser (so traffic appears to come from your computer instead of my server) is not possible due to security reasons ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)).

Alternatively, if you would like me to update the calendar manually, you can send me a request by email (contact info is at the very bottom of the page).

</div>
  </div>
</div>

## The Calendar

<script type="module" src="traffic.js"></script>

<h3 style="text-align:center; margin-bottom: 0;">Daily US Air Passengers</h3>
<h5 style="text-align:center; margin-top: 5px;">(according to TSA checkpoint metrics)</h5>
<div id="shadowHost" style="margin: auto; width: 100%; overflow-x: auto;"></div>

<button id="all-all" onclick="showAll()">[default] Show all months across all years</button>
<button id="all-years" onclick="show1monthAllYears()">Show 1 month but across all years</button>
<button id="only-one" onclick="show1month1year()">Show only 1 month</button>

<button onclick="artificial_min = 1500000;update_calendar();">[default] Scale min to 1.5M (cut off COVID data)</button>
<button onclick="artificial_min = 0;update_calendar();">Scale min to 0.09M (put COVID into perspective)</button>

## Observations
#### General observations
1. COVID significantly reduced air travel from March 2020 through about May 2021 (obviously)
2. Summer months (May-Aug) are significantly busier than the rest of the year.
3. Thurs/Fri and Sun/Mon are the busiest days of the week.

#### Holiday-specific observations
<style>
  .most-busy { background-color: #ff0000; }
  .very-busy { background-color: #ff5555; }
  .busy { background-color: #ff9999; }
  .more-busy { background-color: #ffcccc; }
  .normal { background-color: #eeeeee; }
  .less-busy { background-color: #ccffcc; }
  .least-busy { background-color: #00ff00; }
</style>
1. New Years holiday season doesn't seem to be crazy busy compared to other holidays, presumably because it's spread over multiple weeks.
2. Thanksgiving:
   1.  <span class="normal">Friday</span> before is like a typical Friday
   2.  <span class="more-busy">Saturday</span> before is busier than a typical Saturday
   3.  <span class="less-busy">Sunday</span> before is less busy than a typical Sunday
   4.  <span class="normal">Monday</span> before is like a typical Monday
   5.  <span class="busy">Tuesday</span> before is quite busy
   6.  <span class="very-busy">Wednesday</span> before is very busy
   7.  <span class="least-busy">**Thursday**</span> (**Thanksgiving day**) is LEAST busy (among the least busy days of the *year*)
   8.  <span class="less-busy">Friday</span> after (Black Friday) is also NOT busy (less busy than an ordinary day)
   9.  <span class="more-busy">Saturday</span> after is busier than a typical Saturday
   10. <span class="most-busy">Sunday</span> after is the most busy day of the *year*
   11. <span class="very-busy">Monday</span> after is about as busy as Wednesday before
   12. <span class="normal">Tuesday</span> and beyond return to normal

3. Of the "minor" holidays:
   1. MLK day weekend (mid Jan) is like a normal weekend
   2. President's Day weekend (mid Feb) is noticeably busier Fri/Mon, but not crazy busy
   3. Memorial Day weekend (end of May) is significantly busier Fri, and a bit busier Mon
   4. Juneteeth is like a normal weekend (compared to the already peak summer travel)
   5. July 4th is LESS busy than the surrounding weeks.  Perhaps because people either take the whole week off or celebrate in their home city.
   6. Labor day weekend (early Sept) is a bit busier on the Monday of labor day, and marginally busier on the Friday before.
   7. Columbus day weekend (mid Oct) was a little busier in 2019 and 2021, but not 2022
   8. Veteran's day weekend (mid Nov) is like a normal weekend

#### Code
All the code is html/css/js and runs in your browser, so feel free to scrape it and modify it as you wish. :)

Leave feedback in the comments below!

<template id="shadowTemplate">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
  <link rel="stylesheet" href="calendar.css">
  <link rel="stylesheet" href="mega-calendar.css">
  <link rel="stylesheet" href="traffic.css">
  <script type="module" src="mega_calendar.js"></script>
  <script type="module" src="calendar.js"></script>

  <div class="colorbar-container" style="padding: 0 0 20px 0px;">
  <p style="margin: auto; width: fit-content;">Number of passengers (M=millions)</p>
  <div style="position:relative;"><div class="colorbar"></div></div>
  </div>

  <div class="mega-calendar-container" id="mega-calendars-container">
    <div class="monthnames">
      <div style="height: 110px;"></div>
      <div class="monthname">January</div>
      <div class="monthname">February</div>
      <div class="monthname">March</div>
      <div class="monthname">April</div>
      <div class="monthname">May</div>
      <div class="monthname">June</div>
      <div class="monthname">July</div>
      <div class="monthname">August</div>
      <div class="monthname">September</div>
      <div class="monthname">October</div>
      <div class="monthname">November</div>
      <div class="monthname">December</div>
    </div>

    <div class="wrapper" id="allMonthsAllYears">
      <div class="mega-calendar">
        <header>
          <p class="current-date"></p>
        </header>
        <ul class="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="days"></ul>
      </div>
    </div>
  </div>
  <div class="mega-calendar-container-below"></div>

  <div class="calendar-container" id="calendars-container">

  <div class="wrapper calendar-month">
    <header>
      <p class="current-date"></p>
      <div class="icons">
        <span id="today" class="material-symbols-rounded">Today</span>
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days"></ul>
    </div>
  </div>

  <div class="wrapper calendar-month">
    <header>
      <p class="current-date"></p>
      <div class="icons">
        <span id="today" class="material-symbols-rounded">Today</span>
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days"></ul>
    </div>
  </div>

  <div class="wrapper calendar-month">
    <header>
      <p class="current-date"></p>
      <div class="icons">
        <span id="today" class="material-symbols-rounded">Today</span>
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days"></ul>
    </div>
  </div>

  <div class="wrapper calendar-month">
    <header>
      <p class="current-date"></p>
      <div class="icons">
        <span id="today" class="material-symbols-rounded">Today</span>
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days"></ul>
    </div>
  </div>

  <div class="wrapper calendar-month">
    <header>
      <p class="current-date"></p>
      <div class="icons">
        <span id="today" class="material-symbols-rounded">Today</span>
        <span id="prev" class="material-symbols-rounded">chevron_left</span>
        <span id="next" class="material-symbols-rounded">chevron_right</span>
      </div>
    </header>
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days"></ul>
    </div>
  </div>

  </div>
  <div class="calendar-container-below"></div>
</template>

<script>
  // document.addEventListener('DOMContentLoaded', () => {
  //   const host = document.getElementById('shadowHost');
  //   const shadowRoot = host.attachShadow({ mode: 'open' });

  //   const template = document.getElementById('shadowTemplate').content.cloneNode(true);
  //   shadowRoot.appendChild(template);
  // });
</script>
