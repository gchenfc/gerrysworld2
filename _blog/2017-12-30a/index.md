---
title: "Migrating to Google firebase"
postType: "miniproject"
description: "After having had such a pleasant experience hosting my Secret Santa site with firebase, I decided to move the entire site over."
# date: Dec. 28, 2017
---

## Intro
Google firebase is a plateform geared toward mobile app asset management and storage, but works great for web management and hosting as well.  I used firebase for the database of my <a href="triphi.gerrysworld.com">Secret Santa Site</a> so I decided to also host the secret santa site with firebase's hosting capability.  I was not disappointed.  Following, I decided to move the entire site over.

## Github Pages vs Firebase
The biggest factor in motivating my transition was the fact that firebase provides free, automatic SSL certificates.  Even though most people may not care or even notice which sites are served over https, it had bugged me from day one that my site would get a nasty red cross through the http - not secured part of the url on Google Chrome.  And who knows, maybe some day I'll have a real reason to need SSL certificates.

There are, however, still a couple tradeoffs to consider.  I've summarized those which meant the most to me in below.

#### SSL
already explained above.  Github only offers SSL for github.io urls - i.e. no custom domains.  Firebase offers free, easy SSL certificates for custom domains.
#### Updating code/site
Since Github Pages is (obviously) powered by git, uploads are managed by git so full revision control is available.  Even though firebase has previous versions and rollback functionality, it has no "diff" recognition and uploads the entire project every time.  As far as I know, there's also no support for branches, local rollbacks, etc that git does so effortlessly.  According to one of the feature request threads, selective uploading is "on their agenda" but they don't yet "have a timeline" for it.  Until then, I have everything in a git repo as well to keep track of revisions.  The biggest grievance I have is that it takes forever to upload new verions to firebase.  I will likely start migrating assets to a different location (i.e. AWS S3, cloudflare) leaving only html/css in the firebase project to help mitigate this issue.  It's a better practice anyway.
#### Usage Limits
Both services offer 1GB of free storage, but whereas Github Pages offers 100 GB of downloads per month (i.e. user site acceesses/downloads), firebase only offers 10GB per month.  I definitely don't see this becoming an issue any time soon, but it's definitely something to keep in mind for the future.  Savings can also be realized by storing assets at another location as described earlier.
#### Uptime/Speed
I don't really know how these two services compare in this respect, but they are both fine for my needs now.

### Other Options
I've read that Surge is also somewhat popular, as well Netlify.  Netlify is definitely an appealing option with free https for custom domains as well as git support, but I'm currently having some issues with excessive build time.

## How To:
Switching over to firebase was such a breeze.  I took all of 3 minutes to type 2 terminal commands and that was pretty much it.  <a href="https://desiredpersona.com/google-firebase-hosting-jekyll/">Desired Persona</a> gives a good summary of the steps involved.  Since I had already set up firebase for the secret santa site, I skipped to "Setup a Firebase project".  After that, I just changed the appropriate A records in GoDaddy and everything was set.

## Conclusion
I think the main take-away here is that switching hosting providers is very quick and easy.  If ever I find better alternatives or my needs change, it's good to know that switching is a breeze and can be done in around 10 minutes from start to finish.