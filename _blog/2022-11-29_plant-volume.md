---
title: "Measuring Plant Volume Ground-Truth"
postType: "random"
description: "I tried measuring ground-truth plant volume using water displacement but it doesn't work very well."
date: Nov 30, 2022
stylesheets: ["/css/blogPost.css", "/css/slideshowGallery2.css"]
redirect_from: "/blog/2022-11-29.html"
---

<img src="https://lh3.googleusercontent.com/tUom-TcMWV5hVHUB5vphuNHG1V2O4P20AbWoubu-d1wuvcqrsURYhkQ2p08FvFA7crgX11kPQ7FuiHzT4SWdQz0HORbPrBjwa5F5TZorrrML6Q_cbPyE08qLMGrEHNeNS-0ZaSYCPtU=w1920-h1080" style="float: right; display: block; margin-top: -5em; max-height: 275px; max-width: min(300px, 40%); aspect-ratio:3024/4032" />

- [TL;DR](#tldr)
- [Background](#background)
- [Procedure](#procedure)
- [Results](#results)
- [Pictures](#pictures)

## TL;DR

Use water displacement to measure plant volume by putting a cup of water on a scale and dunk a plant into it.

It kind of works but not great.

The main problem is that surface tension is non-negligible (a few grams-worth of force) and can't be controlled-for.  One way to mitigate this may be to use a different fluid with [lower surface tension](https://en.wikipedia.org/wiki/Surface_tension#Data_table), such as ethanol or nonpolar solvents.

The rubbing of the leaves on the sides of the water vessel also introduces some error, but this is relatively easy to resolve with a bigger container.  I switched from a large glass to a large tupperware.

## Background
For one of my [research projects](/projects/hydroponics), I was interested in measuring the ground-truth volume of a plant non-destructively (to compare with the volume estimated by Structure-from-Motion).  Non-destructively meaning without cutting off the plant.  You can't e.g. weight the plant without cutting it down because you don't know how much mass is the plant and how much is the pot (but if you could weigh the plant, assuming density = 1g/mL is pretty safe since prior lab tests show lettuce is >95% water).

I had the idea to use water displacement to measure the mass of the plant.

## Procedure

1. Place an open-top container of water on a scale.
2. Tare the scale
3. Flip the plant upside down *not* over the water (so that soil/particles don't fall into the water).
4. Carefully dunk the plant all the way into the water
5. Record the mass indicated by the scale.
   1. It can be shown through various ways that the mass indicated by the scale will be exactly the mass of the water displaced by the plant, regardless of the "force" of your hand holding up the plant pot.
   2. Divide mass (in grams) by density of water (1 g/mL) to obtain the volume of the plant.

## Results

| Sample | Volume | Random Variation |
|Rosemary|8mL|1mL|
|Basil | 29mL | 3mL |

"Random Variation" was measured by randomly dunking the plant a tiny bit deeper or shallower to "pull the water up" or "push the water down" a bit and eyeballing the range of values displayed on the scale.  The "Volume" column represents the middle of the range of values and the "Random Variation" represents the range.

It seems (very roughly!) that the measurement has about 10% error (what are the error bounds on that error? 😂).

## Pictures

<script src="/scripts/googlephotos_carousel.js" async></script>
<div class="pa-gallery-player-widget" style="width:100%; height:480px; display:none;"
  data-delay="2"
  data-link="https://photos.app.goo.gl/V6K1NZmSaZWFKUo97"
  data-title="Plant Volume Measurement"
  data-description="12 new items added to shared album">
  <object data="https://lh3.googleusercontent.com/dPugShcFJPT5jM5bTEtcnVgxh_TLxrxmD1d48Ej3FS0wezWAujN3sA4tijYMIvWKRIKFvG2j6uN49Vp2No29mCTPxDM3MhJ7cEPXruSZp0Dcwv7LiXCHQlbMYKWNQ1Vei2gPBUKLKYU=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/969XxRoUSaSqaA9nqsCpXmQ69d3fiwmdB0pnqyfsp_jiCfUMChiTmh7aqseaFT5QmOg3g92w6H50NQieIR7ENsnOq9Qst28MZFrKPHY_HX1TLW3SlC7SkAxdtVHV7vwoW57LS5TI2lk=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/XpW9hurhvkNpMWRwtrIf2yWaIlKDaTiLTMpDT7yKNOzRoSxsl2IRV1atIBoO1gCWTc6bq7nmASL_WV8d3mEWj7acm-kz60U-Ig5UO_GAJe0Xg3OLaEJAHZGqE2EfRGtcnMyhqVJ9Rv8=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/tUom-TcMWV5hVHUB5vphuNHG1V2O4P20AbWoubu-d1wuvcqrsURYhkQ2p08FvFA7crgX11kPQ7FuiHzT4SWdQz0HORbPrBjwa5F5TZorrrML6Q_cbPyE08qLMGrEHNeNS-0ZaSYCPtU=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/NEHnmSewXBgByxqvntNVQxxljyA6yQsMF6NkUqMHnfFAJQNjJjUw_BtUpu-yp705b1tTkkYzodOu6tKBGd-OEjpDbpxeczrtiRYA_l2WJ3-xPRAu6FjTd2c7IxrsrfZgqJQmcTAAkt4=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/x_zoSamdnT-vX3Fg2sWqbq4mF80blj_RANYX9BDXpTt8PHZHFKSo4KslsTwSvIjPfASZFlLtgh8jtjnRtME0hXpr1iYmT3LJcRvyB0uvNZqcz-B3QxJXdqtmshSLJQSas33TBuab-6k=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/q5yg-01GDYhwDxbWuJyEsaTXvUSIU5hXk83B0-XA9lxLQSGhAHIwS_HvY8HERf-pdBlnvGF18KOWT6pGucrH1ALiux_1KMc5g42T_c83_9Lg4388KdBRb0yYF9wiWYA5SVloZbbfmE4=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/QAeTImhbRKW7rn_NO6lhykSZXZjmWaARkYEa3jYdsbYdaK8npjC3zemlgT9xhaOLNqbMwh-S3-pW28RVorGXjWeppomEq4GM7jAVGc17GfBiOb9MeL3Thfz2ONK7gRorxzrnojakztU=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/_2NU4Qgl2rzthj_ouqMrijDppS4amQVNR6jdQyJ_TMBvpbleQle35EXTnd57AchKASoXuKXdyJbPwZK5Hp0H_foqcxUbfXbmkQJwurnrMjtoyWJ3IIdoYdHiu_6KAz6eWctgCqDm-GM=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/G3JDgXJ49swWxe3tUlBBu34SSBqY47XvWjf-ag4iFOCw1PmjOwSAcMT2zP8BAxU1TD2fofiwCNDb_g_16mCtFy0ThSfLaCTadxvyFYX4HoKu8m5M_H7Gcuh9VC5CCphPcAr3Lv1heM0=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/DtAk9qBr62t7_57cO9UM9oTOfkxYzpW4AN7dr9Gk58_CQ2031j2renYVFee-Uwr1DfVMiYNqVy__Hi0zkzhSPsMpI28k6_Kb08t7Fc_JP461KVJEPM6jk4lSrqw7GY2NDx8ezSesQBk=w1920-h1080"></object>
  <object data="https://lh3.googleusercontent.com/NC1AMRw-IpU7kvM_xdxfSs5-Bp0rVTM5b0fc-BpXdc2KZTec8dSfAODCADtcGg9RW_IWDdaO_oD0n1b_go6AYZGCMIt4cV01GDBi-kEGR1FboOH6bP7Xkv10GRgUyTxik0rcMwOoFzI=w1920-h1080"></object>
</div>

