---
title: "Site Traffic Analytics"
shortTitle: "Site Analytics"
postType: "random"
description: "I'm curious to see the traffic to this site."
date: Sept. 27, 2017
---

<!-- ********** CONTENT *********** -->
Just now I updated all the pages on the site to be configured with Google's Site Analytics so that I can monitor real time traffic.  This is in response to (a) wondering how worth it it would be to keep this blog updated and (b) seeing if people are accessing the new <a href="/studygroups">Math Study Groups</a> page I put up.

I also just realized it might be useful to see if potential employers ever view it after talking to them during a networking event, interview, etc.

It was as easy as making an account and copy/pasting a couple lines of code (below) to the "`head`" of each page.

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-107206610-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'UA-107206610-1');
</script>
```

That's all!
<!-- ********** CONTENT *********** -->