---
title: "Flight iCal Generator ✈️📆"
postType: "miniproject"
description: "Create a calendar .ics file online given a flight number."
date: Jul 13, 2025
tags:
  - ical
  - ics
  - flight calendar
  - calendar invite
  - flight ical
  - amadeus api
  - air travel tools
  - flight planner
  - add flight to calendar
  - budget airline tips
  - travel productivity
  - javascript
  - github pages
  - cloudflare workers
keywords: "ical flight, generate ics, online ical, flight calendar tool, ics calendar flight, add airline ticket to calendar, travel tools 2025"
---

## 🧳 TL;DR

No more manually typing flights into your calendar: just enter your flight number and date, download the ics, and drag-and-drop into your calendar app!

<!-- [Click here to go to the tool](https://gchenfc.github.io/flight-ical-generator/) -->
<div style="text-align: center; margin-top: 2em; margin-bottom: 2em;">
  <a href="https://gchenfc.github.io/flight-ical-generator/"
     target="_blank"
     rel="noopener"
     style="display:inline-block;padding:0.75em 1.5em;background-color:#007bff;color:white;border-radius:6px;text-decoration:none;font-weight:600;transition:background-color 0.2s ease;">
    ✈️ &nbsp; Try the Flight iCal Generator &nbsp; 📆
  </a>
</div>

---

## 👋 Introduction
I travel a decent amount, and every time I book a flight—especially with budget airlines—I get so frustrated if there’s no easy “Export to Calendar” button. It’s like: I have the flight number and date, but somehow I still need to manually type in departure/arrival times. So annoying 😤

So I decided to build a simple tool: you enter your **flight number + date**, click a button, and boom—you get a downloadable `.ics` file ready to import into Google Calendar, Apple Calendar, Outlook, etc.

---

## 🚀 How it works (in two minutes)

1. **Flight lookup**  
   The tool sends your flight code to the **Amadeus Self-Service API** and gets back the scheduled departure/arrival info.
2. **Calendar file generation**  
   It converts that info into a standards-compliant iCalendar file, complete with timezone-aware timestamps, flight summary, and a nice verbose description.
3. **Easy download**  
   You click “Download .ics” and voilà — your calendar app accepts it with no fuss.

---

## 🛠️ Why this is cool

- **No backend server** — just client-side JavaScript hosted on GitHub Pages  
- **Secure API handling** via a Cloudflare Worker proxy (no secret leakage)  
- **Smart timezone handling**, so Departure: Sat Jul 19 11:30 CEST → Arrival: same date in PST  
- **Adds confirmation numbers, notes, and a link to FlightAware**  
- 100% free, MIT-licensed, and tiny enough to load in moments

---

## 🤖 How ChatGPT helped

Full confession: I **vibe‑coded** this entire project (including this blog post!) with ChatGPT. It was an incredible collaborator:

- I described the features I wanted 📝  
- ChatGPT gave me clean, modular JS code  
- It helped with everything—CORS handling, timezone conversion, calendar export, GitHub Pages deployment, Cloudflare Workers setup  
- It even suggested ways to embed the tool in this blog post 🎉  

In short: I asked, it delivered — basically **one‑shot everything** with minimal editing.

---

## ✨ Try it out

You can test the live tool embedded here 👇

<style>
  #flight-tool-wrapper {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }

  #flight-tool {
    width: 100%;
    border: none;
    transition: height 0.3s ease;
  }
</style>

<div id="flight-tool-wrapper">
  <iframe
    id="flight-tool"
    src="https://gchenfc.github.io/flight-ical-generator/"
    height="700"
    allowtransparency="true"
    scrolling="no"></iframe>
</div>

<script>
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'flightToolHeight') {
      const iframe = document.getElementById('flight-tool');
      if (iframe) {
        iframe.style.height = event.data.height + 'px';
      }
    }
  });
</script>
