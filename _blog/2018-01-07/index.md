---
title: "Site Comments"
postType: "random"
description: 'I thought it would be cool and easy to add a "comments" widget to the bottom select pages on my site.'
date: Jan. 6, 2018
---

<!-- ********** CONTENT *********** -->
## Intro
There's really not much to say here - I wanted a way to incorporate comments on my site!  Particularly in the blog and projects sections, I wanted a way to get feedback and for people to pose extra questions they may have which I did not address.

## Choosing a system
A couple weeks ago when I decided I wanted a comment section, I Googled ways to do it.  I found solutions for Facebook, Google, Twitter, and other social media site logins, but I wanted one that allowed for any site login in addition to a 'guest' option.  I decided to just take a couple days to observe what methods were used by some sites I happened to come across.  I found that Disqus was, by far, the most common solution.

## Disqus
<a href="https://disqus.com/">Disqus</a> is a company which hosts comments and allows static sites to include the comments section with some simple javascript, which is exactly what one expects.  Conveniently, it allows faux-login options via facebook, google, etc. although it's not quite as streamlined as I would have liked.  Oh well - can't ask for everything.  Disqus offers a free tier which supposedly has ads but I haven't really seen any so perhaps this only applies to higher volume sites.

## Implementation
Getting things working is as easy as making an account at Disqus, "Getting Started" with a Disqus site, typing in some info, and copy/pasting the javascript code according to the instructions that came up.

Pretty much everything will run by default, but since I'm using Jekyll (see <a href="/blog/2017-12-30">this blog post</a>), I had the option to set the "page url"s to the appropriate Jekyll variable 
{% raw %}("https://gerrysworld.com{{page.url}}"){% endraw %}
, though according to Disqus they use the url by default anyway.  They claim this may cause issues with urls like "https://gerrysworld.com" vs "http://gerrysworld.com" vs "www.gerrysworld.com" vs etc., so I decided to set the page url just in case.

I also added a Jekyll variable "comments" as per their recommendation to specify whether the page should have a comments section or not.  I set in the YAML config file that all blog posts and projects should have comments section by defualt.  I also added comments to the <a href="/studygroups">math study group page</a> because that was a logical thing to do.

I should note that using Jekyll, or really any CMS, made things very easy because I could easily add the widget script to the page templates and it would add to every page on the site without having to manually edit each page.  This was my first big, sweet reward for switching over to Jekyll and oh boy was it good.

## Conclusions
Disqus isn't perfect, but it gets the job done and was super easy to implement.  Maybe someday I'll find a better solution, but for now, I'll call it done.  Try it out below!
<!-- ********** CONTENT *********** -->