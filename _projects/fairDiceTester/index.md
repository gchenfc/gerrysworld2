---
title: "Fair Dice Tester (Pt. 1)"
description: "I made an automated dice rolling machine to test whether a die is fair or not (1-day build).  This is part 1, which covers only the mechanical build (not computer vision)."
status: 'completed'
displaydate: "Nov 19, 2022"
date: Nov 19, 2022

image: "vid_.gif"
imageAltText: "Demo of the automated dice tester rolling an 8-sided die."

stylesheets: ["/css/projectPost.css", "/css/slideshowGallery2.css"]
---

- [Introduction](#introduction)
- [Construction](#construction)
    - [Earlier attempts and things to watch out for](#earlier-attempts-and-things-to-watch-out-for)
      - ["Finger" to pull down the cup](#finger-to-pull-down-the-cup)
      - ["Spring"](#spring)
      - [Stepper Motor Speed \& Homing](#stepper-motor-speed--homing)
      - [BluePill \& ST-Link v2 connection issues](#bluepill--st-link-v2-connection-issues)
- [Next Steps](#next-steps)

## Introduction

For fun, I tried my hand at casting some resin dice.  They turned out alright, but had quite a few air bubbles (as expected, since I didn't use a pressure pot).  Additionally, I did some hand-sanding to clean up some of the edges and I got curious if this affects the fairness of the die at all.  Therefore, for more fun, I decided to throw together this automated dice roller.

<iframe src="https://www.youtube.com/embed/gvjzX1176rY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; max-width:560px; aspect-ratio: 560/315; margin-left: auto; margin-right: auto; display: block;"></iframe>

## Construction
I used a cheap 28BYJ-48 stepper motor & ULN2003-based driver board I had laying around, controlled by a BluePill (STM32F103-based Arduino-like board).

The die itself is held in a plastic cup which is held by a rubber band.  This way, by pulling the cup to one side then releasing, the die will get shaken-about inside the cup.  I used Wooden popsicle sticks connected to the shaft to pull and release the cup (with a little piece of tape for the popsicle sticks to slot into) and it works surprisingly well.

#### Earlier attempts and things to watch out for

##### "Finger" to pull down the cup
Initially, I used a clay "finger" to wrap around the stepper's shaft (I used clay instead of e.g. 3D printing because I was too impatient to wait for a 45min print).  This worked alright, but it was a little bit flexible so it would sometimes fall off the shaft.  Also, I forgot that I wanted 3-4 "fingers" on the rotating part so that I could roll faster (the stepper motor is not that fast and takes a few seconds to complete a revolution).  When I was taking measurements to make "version 2" of clay fingers, I just grabbed the nearest object I could see to note the length I wanted the finger to be, and that nearest object was a popsicle stick.  This turned out really well because, coincidentally, it was exactly half the popsicle stick, so I decided to just drill out a slot (drill 2 holes right next to each-other and use a knife/diagonal cutters to smooth it out) in the center of the popsicle stick and wedge that onto the motor shaft.

##### "Spring"
For the "springy" mechanism, the most important thing to keep in mind is the low torque capability of the stepper motor.  I don't have an exact number, but I was teetering on the edge of the motor's torque capabilities.  I also tried using steel wire (you can see it's what I used to position the cup/rubber band relative to the table), but ultimately I couldn't configure this in a way that had a sufficiently low spring constant.  In the end I found the rubber band was a pretty good level of springiness so I just kept it.

##### Stepper Motor Speed & Homing
For the motor itself, keep in mind that going at a faster (almost max) speed will reduce its torque and cause it to slip.  I actually ended up taking advantage of this by creating a "startup"/"homing" procedure where I would spin the motor really fast and it would always get caught at the same place on the cup.  Then I would know exactly what part of the rotation the motor was at.  This is kind of like homing motors using "bump stop" current sensing detection, but instead if just assumes the motor will harmlessly keep slipping until the homing procedure (with fixed duration) is done.

Using a stepper motor library with acceleration can be helpful in moving faster speeds without slipping during the acceleration up to that speed.

I programmed a speed profile that goes fast when not in contact with the cup, then slows down as it needs to pull down the cup against the rubber band.  Then upon release, it speeds up again until the next pull-down.  I programmed these as open-loop durations/angles and didn't use any current feedback or anything like that.  In combination with the "homing" procedure laid out, this works *very* well considering how simple it is.

##### BluePill & ST-Link v2 connection issues
Finally, I think I had only used the BluePill once or twice before (usually I opt for Arduino Nano since I have tons just lying around) but I decided to take this simple project as an opportunity to play with it a bit more.  I also wanted to try out PlatformIO for the same reason - I had only used it 2 or 3 times before and I wanted to get some more familiarity with them both.

I spent a short while trying to figure out why things the BluePill connect (using my knockoff ST-LINK v2).  Specifically, when I connected my knockoff ST-Link v2 and BluePill, I would get some device (ST-Link v2) showing up as a USB device, but none of the ST-Link v2 flashers would connect to it.  `st-info --probe` was indicating a device of 0x00 or something like that.  Finally, I realized that my knockoff ST-LINK v2 has a different pinout than the official ST-LINK v2.  That was a stupid mistake!  I realized this by powering up the STM32/BluePill with a USB and realizing that it *does* have a built-in LED power indicator light, then probing the jumper wires from the ST-LINK v2 to realize it wasn't giving power, and finally realizing the pinout was completely wrong.  I had just google'd "ST-LINK v2 pinout" but actually my clone ("Baite") had a different pinout: <img alt="pinout of different ST-Link v2 clones" src="https://tenbaht.github.io/sduino/hardware/ST-LinkV2_pinout_01.jpg" style="width:60%; margin-left: auto; margin-right: auto" />

## Next Steps
In the next part, I will go through the computer vision used for automatically recording which die was rolled.  I had spent a couple hours on this but it wasn't working very well so I'm going to return later when I have more time.

<!-- <script src="/scripts/googlephotos_carousel.js" async></script>
<div class="pa-gallery-player-widget" style="width:100%; height:480px; display:none;"
  data-link="https://photos.app.goo.gl/fsPyC3WMRAXTxogz5"
  data-title="Fair Dice Tester"
  data-description="8 new items added to shared album">
  <object data="https://lh3.googleusercontent.com/9-uxi6wTOpJ9ATTewNhfiKsw7HPMrPjpsdntQqU-Ci9aWzwVn603wTaQ6NR_ikpiGsXrJnmF0Zg4AtbEsPOf3fGP4b3KGGsWO027F0QuuB1Jtq1sWUBwQYXdIY-nJpNe4r26uunXqg4=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/ta-20DES9ZCU-lGtU1pmrOTZ721YWdVk3QvskwyHZtFrSIHOzD3z_2iLKyFjQd3794hlaFJ02mHpjHt8o_4380fpJBjEYK6v1VCRbVjLXs35VzjskzC7N7IuTlPex0Lbcyli7YK1pwY=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/lRrgHb-N5ApeMexcoI6SzBJon0lBKbcM3KIVZghMFFgzrGNOD_0H3dAXLfZBET11NbhpW03tuS5ZPH02JUmbY_Idsn01EPPHTIXx3SyobrfIZMpB1KsyLXUyJfi7TQ9kTkYu9j4kL3E=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/12YwrpFWgXcAxe5JWjlF9M6k9YwrNF8VDOk5IDAXCLyFyoJgMl_bQ0NktWYWjCo7ZWCuWgk4Cahua4m9Gfto22ft58uj_xkH2K5UpWK7y5rpWCxFX_SkWd4UT7CfFXXffGPLRks5yYk=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/dzlXjftUsggX6K2RpkIg45XhxyzvXXzR_5WUJNFvkdaQ9nLhAiuyU5M7HUip4PDnFFuZ0Mkr3xKhvibN61vMteenCG4bg3ZpSG9_0kUPJ-yr03jqiXOoh2U6ZVjyzGUp4MhEX4IxIRU=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/Vwlag8LIWzjq-8722qyI1PYNQHcDvP2mJnOf_63v-VxsyImRLNKO7VYjEqbdE8n8beKBK32ZYDVqjfKD_i0p5DwQonZzxwGqymfqTWnEc98W3xmvz-EWXzIEMNzOkfm-niQN21BpMX8=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/60x1lM_2VzfAWooxn-Hd4XJ_PwJgSegRsWb6s88ZhkH_s4_vY3C13iT7q4ezO8fJEJLS1oTq-f8Ro-z0P9HrIxx7uZ0M4DPfGORLb10wy3eH4JSe_iRKL-X3NZxvAgubgf4tMmkf9eU=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/TnIk_H7iByGHaKyY0iuwkNVVvNq4JfSf-TksIV3WsQq4cvZmG42rkj6snt51k7_bm_0PPogTSAxWDvEy_ooGlwmu00AnT3SANmgi2as_1UxSC2C9ICGIa6LPXw3D89Ok3zOedZ_85pE=w1920-h1080"></object>
</div> -->
