---
title: "Hydroponics Robot"
description: "A robot that monitors and maintains a hydroponic rig."
status: 'completed'
displaydate: "Fall, 2019 - Present"
date: Sept 1, 2024

image: "denseReconstruction_small_transparent.gif"
imageAltText: "Example 3D plant reconstruction"

sidepic: "denseReconstruction_small_transparent.gif"
sidepicfull: "https://drive.google.com/file/d/1PsD321DjNEJU8XQuRVh8S9o2ukKgJ1Pf/view?usp=drive_link"
sidepicAltText: "Example 3D plant reconstruction"
stylesheets: ["/css/projectPost.css", "/css/publication.css"]
---

<p style="font-size: 20pt; text-decoration: underline;">Table of Contents</p>
- [Related Publications](#related-publications)
- [Timelapse](#timelapse)
- [Poster](#poster)
- [Image Capture Robot Arm](#image-capture-robot-arm)
- [Raw Images](#raw-images)
- [3D Reconstruction](#3d-reconstruction)
- [Cable Robot](#cable-robot)
- [Other media](#other-media)

# Related Publications
{% assign publications = site.publications | sort: 'date' %}
{% for publication in publications reversed %}
  {% if publication.title contains "Plant" or publication.title contains "Hyperspectral" %}
<div class="publication">
  <div class="publicationrow">
    <div class="publicationcolumn1">
      <figure class="imagefig">
        {% if publication.img_custom %}
          {{publication.img_custom}}
        {% elsif publication.img contains '://' %}
          <img src="{{publication.img}}" alt="{{publication.title}}" style="width: 300px; {% if publication.img_crop %}height: 110px; object-fit: cover;{% endif %}"/>
        {% else %}
          <img src="{{publication.url | remove: "/index.html" }}/{% if publication.img %}{{publication.img}}{% else %}icon.png{% endif %}" alt="{{publication.title}}" style="width: 300px; {% if publication.img_crop %}height: 110px; object-fit: cover;{% endif %}"/>
        {% endif %}
      </figure>
    </div>

    <div class="publicationcolumn2">
      <header><h3><a href="{{publication.url}}">{{publication.title}}</a></h3></header>
      <div class="journal">
        {{publication.journal}} ({{publication.year}})
      </div>
      <div class="author">
        {{publication.author}}
      </div>
      <div class="links">
        {% assign mylinks = "false" %}
        {% if publication.PDF %} [<a class="link-style" href="{{publication.PDF}}">PDF</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.Poster %} [<a class="link-style" href="{{publication.Poster}}">Poster</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.pptx %} [<a class="link-style" href="{{publication.pptx}}">pptx</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.Code %} [<a class="link-style" href="{{publication.Code}}">Code</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.Video %} [<a class="link-style" href="{{publication.Video}}">Video</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.DOI %} [<a class="link-style" href="{{publication.DOI}}">DOI</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.arxiv %} [<a class="link-style" href="{{publication.arxiv}}">arXiv</a>] {% assign mylinks = "true" %} {% endif %}
        {% if publication.zip %} [<a class="link-style" href="{{publication.zip}}">zip</a>] {% assign mylinks = "true" %} {% endif %}
        {% for link in publication.links %}
          [<a class="link-style" href="{{link[1]}}">{{link[0]}}</a>] {% assign mylinks = "true" %}
        {% endfor %}
        {% if mylinks == "false" %}
          <p>Contact me for further information.</p>
        {% endif %}
      </div>
    </div>
  </div>
</div>
  {% endif %}
{% endfor %}

# Timelapse
<!-- HTML5 video embedded with autoplay -->


[<video class="sidepic" autoplay muted loop style="width:90%; max-width:800px; margin:auto; display:block;"><source src="hydro_keystone_rot.mp4" type='video/mp4'></video>](hydro_keystone_rot.mp4)

# Poster
[![poster](../../publications/Chen23icra_hydroponics_robot/poster_icra_gerry_small.svg)](../../publications/Chen23icra_hydroponics_robot/poster_icra_gerry.pdf) 

<!-- Dropdown -->
<div class="wrap-collapsible">
  <input id="collapsible" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible" class="lbl-toggle">Old Poster</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

[![poster](4_poster_compressed.svg)](4_poster.pdf)

</div>
  </div>
</div>

# Image Capture Robot Arm
<!-- [![image collection process](plantcapture_small.gif)](plantcapture.mp4)  -->
<video muted autoplay loop style="width:90%; margin: 0 auto; display: block;">
  <source src="plantcapture.mp4" type="video/mp4">
  Your browser does not support the video tag.  Please <a href="plantcapture.mp4">download the video</a>.
</video>

# Raw Images
[![images set 0](circle0.gif){:width="200px" style="float: left;"}][circle0_big]
[![images set 1](circle1.gif){:width="200px" style="float: left;"}][circle1_big]
[![images set 2](circle2.gif){:width="200px" style="float: left;"}](circle2.gif)
<br style="clear: both" />

# 3D Reconstruction
[![3D reconstruction of lettuce][med_gif]][large_gif]

# Cable Robot
This is the planned next step of the project: the robot arm will be mounted to a cable robot to monitor many plants autonomously.

<iframe src="https://myhub.autodesk360.com/ue2946219/shares/public/SH56a43QTfd62c1cd968ba4b2659ad04cc3e?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>

# Other media
<iframe width="560" height="315" src="https://www.youtube.com/embed/LTQs_Olgw5A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[circle0_big]: https://drive.google.com/file/d/11GFabAPPrxx5cKfWfbCUpIt8cfGcWRlt/view?usp=drive_link
[circle1_big]: https://drive.google.com/file/d/1jWWJvojVIbn6R_CnY6hIPqQHtMLKTRJ_/view?usp=drive_link
[med_gif]: denseReconstruction_med_transparent.gif
[large_gif]: https://drive.google.com/file/d/1dKn2jPAbBw_fMV4LGql997pwb_wGa_QW/view?usp=sharing
<!-- [med_gif]: https://drive.google.com/uc?id=1ZUm7hk6-Ez89FMNKyuP-ulheR-o4U4uB
[large_gif]: https://drive.google.com/uc?id=1dKn2jPAbBw_fMV4LGql997pwb_wGa_QW
[large_gif]: denseReconstruction_large_transparent.gif -->
