---
title: "Migrating to Netlify"
postType: "miniproject"
description: "After some qualms with Google firebase, I decided to try out my hand with Netlify"
date: Jan 8, 2018
---

## Intro
Netlify is a free, git-connected static site hoster similar to Github pages with a couple additional benefits.  It has multiple tiers, but its free tier is more than good enough for me.  This blog post is a continuation of [this post](/blog/2017-12-30a).

## Github Pages vs Firebase vs Netlify
Like firebase, Netlify offers free SSL certificates as well as its own CDN.  It's also fully integrated with Github and builds with Jekyll (as well as various other static site generators and CMSs).  It provides some build flexibility (i.e. you can type your own build command) and shows its deploy log.

As a continuation of [this post](/blog/2017-12-30a), I'll continue with the tradeoffs discussed in that post.

#### SSL
Firebase and Netlify both offer free SSL for custom domains, unlike Github Pages.
#### Updating code/site
Netlify connects directly to a git repository and automatically recompiles when the repository has changes, much like Github Pages.  This solves one of the big grievances with firebase, which has no smart uploading - it just uploads the entire site every deploy.
#### Usage Limits
Both services offer 1GB of free storage, but whereas Github Pages offers 100 GB of downloads per month (i.e. user site acceesses/downloads), firebase only offers 10GB per month.
Netlify has 100GB/month download/network bandwith like Github Pages whereas firebase offers only 10GB/month.  Netlify somehow allows a whopping 100GB of storage compared to Github and firebase's 1GB.  Netlify supports up to 3 deploys/minute which is more than enough for pretty much any reason I can think of...
#### Uptime/Speed
I didn't do rigorous testing/investigation, but I did a quick ping of the three versions of my site (gchenfc.github.io, gerrysworld2.firebaseapp.com, gerrysworld.netlify.com) and they all had similar ping times of around 30ms.

I also tried observing the page load times for the site home page using Google Chrome's built-in dev tools.  The page download speeds did vary a bit, with Netlify being a bit slower, but I'll have to investigate more later.

## How To:
Switching to Netlify was very easy.  I just logged in with my github account and selected the repo I wanted to deploy.

I faced an issue where some videos which happened to be hanging out in the repo were causing the deploy to fail due to inability to upload the large files (upload timeout), but adding those to the gitignore file solved the issue (they weren't actually used since I uploaded them to YouTube).

Other than that, it was a breeze of an installation.  It even recognized that I was using Jekyll.

## Conclusion
Netlify seems to be a solid choice for hosting static sites, though the speed is a bit concerting.  I'll investigate more later.  Right now, I have a new domain name "gerry-chen.com" hosted by Netlify and the old one "gerrysworld.com" hosted by firebase.  I'll see how they go.

\*EDIT\* gerrysworld.com has been shut down.