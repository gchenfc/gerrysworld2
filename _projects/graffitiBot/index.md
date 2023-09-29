---
title: "Graffiti Robot"
description: "A robot that paints graffiti!"
status: 'in progress'
displaydate: "Fall, 2019"
date: Oct 1, 2019

image: "../../publications/Chen22icra_GTGraffiti/icon.jpg"
imageAltText: "CAD model"

sidepic: "frame1.png"
sidepicfull: "frame1.png"
sidepicAltText: "Frame built"
stylesheets: ["/css/projectPost.css", "/css/publication.css"]
---

<p style="font-size: 20pt; text-decoration: underline;">Table of Contents</p>
- [Media Attention!](#media-attention)
- [Related Publications](#related-publications)
- [Introduction](#introduction)
- [Random Stuff](#random-stuff)

## Media Attention!

* [VICE](https://www.vice.com/en/article/5d3myx/scientists-are-training-ai-robots-to-write-graffiti)
* [ASME](https://www.asme.org/topics-resources/content/robot-turns-artist-s-commands-to-graffiti)
* [TechXplore](https://techxplore.com/news/2022-06-gtgraffiti-robot-human.html)
* [ZME Science](https://www.zmescience.com/science/graffiti-drawing-robot-developed-234673563/)
* [research.gatech.edu](https://research.gatech.edu/introducing-gtgraffiti-robot-paints-human?utm_medium=email&utm_source=daily-digest&utm_campaign=2022-06-08&utm_content=news)
* [ACM communications](https://cacm.acm.org/careers/261797-grad-students-develop-robot-that-paints-like-a-human/fulltext)
* [Arduino](https://blog.arduino.cc/2022/06/09/graffiti-robot-paints-like-a-human/)
* [WSB-TV](https://www.wsbtv.com/news/local/georgia-tech-student-builds-robot-artist/FPEUYTZ6TFCN5COAONOQWT4SHE/?outputType=amp)
* [ANF Avant South Showcase](https://www.atlantanewsfirst.com/2023/09/29/avant-south-showcases-use-ai-robotics-georgia-tech/)
* [research.gatech.edu](https://research.gatech.edu/introducing-gtgraffiti-robot-paints-human)
* [dailystar.co.uk](https://www.dailystar.co.uk/tech/news/robo-banksy-graffiti-robot-could-27187562)
* [News8Plus](https://news8plus.com/introducing-gtgraffiti-the-robot-that-paints-like-a-human/)
* [Illinois USA News](https://illinoisusanews.com/a-robot-that-draws-like-a-human/13587/)
* [Engineering 360](https://insights.globalspec.com/article/18822/video-researchers-introduce-their-graffiti-bot)
* [geektech](https://geektech.me/a-robot-has-appeared-that-draws-graffiti-like-a-person/)
* [newsfounded](https://newsfounded.com/zimbabwe/the-robot-that-paints-like-a-human/)
* ...

<!-- I don't know exactly how internet journalism works, but somehow there's [100s of Google search results](https://www.google.com/search?q=%22gtgraffiti%22+%2B+%22gerry%22), including in various languages. -->

## Related Publications
{% assign publications = site.publications | sort: 'date' %}
{% for publication in publications reversed %}
  {% if publication.title contains "Graffiti" or publication.title contains "Locally Optimal Estimation" %}
<div class="publication">
  <div class="publicationrow">
    <div class="publicationcolumn1">
      <figure class="imagefig">
        {% if publication.img contains '://' %}
          <img src="{{publication.img}}" alt="{{publication.title}}" style="width: 130px; {% if publication.img_crop %}height: 110px; object-fit: cover;{% endif %}"/>
        {% else %}
          <img src="{{publication.url | remove: "/index.html" }}/{% if publication.img %}{{publication.img}}{% else %}icon.png{% endif %}" alt="{{publication.title}}" style="width: 130px; {% if publication.img_crop %}height: 110px; object-fit: cover;{% endif %}"/>
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

## Introduction

<iframe width="560" height="315" src="https://www.youtube.com/embed/5dH81DFNipQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/R4ySYTNGv6s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Random Stuff
<!-- <p style="padding-bottom:150px"></p> -->

<div style="width:100%;height:480px;background-color:black;text-align:center;">
  <video style="height:100%;" controls>
    <source src="https://lh3.googleusercontent.com/t7u2RXCRQ628cqSrNyn3xcPl4SOP0HIigTkj9JXwwfxfTJZ4Kbt58m_8H8DoTgs8inoFWgI3Hz0e1okQa0IepMSV69awIsE6x6HifSyrqeJxii5p078Kw5kamFZJ7paNW2_VlO5ZB8c=m18" type="video/mp4">
  </video>
</div>

<iframe src="https://myhub.autodesk360.com/ue2946219/shares/public/SH56a43QTfd62c1cd968dfe68d7c2ef9758f?mode=embed" width="640" height="480" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"  frameborder="0"></iframe>