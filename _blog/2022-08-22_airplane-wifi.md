---
title: "Airplane Internet Hack?"
postType: "idea"
description: "Can we abuse the \"free IP messaging\" services of many airlines to get rudimentary internet access?"
stylesheets: ["/css/blogPost.css"]
redirect_from: ["/blog/2022-08-22.html", "/blog/2022-08-22-airplane-wifi.html"]
---

<!-- from https://stackoverflow.com/a/42257283/9151520 -->
<style>
  div.chatbox {
    /* background-color: #fff; */
    border: solid #eee;
    margin: 0;
    padding: 20px;
    border-radius: 10px;
  }

  div.chatbox::before {
    height: 40px;
    content: "Airplane Internet Bot";
    display: inline-block;
    border-bottom: solid #eee;
    margin: 0 0 10px 0;
    padding-left: 50px;
    padding-bottom: 10px;
    width: calc(100% - 50px);
    background: url("images/avatar.png");
    background-size: 40px;
    background-repeat: no-repeat;
  }

  div.chatbox::after {
    /* aspect-ratio: 1754/104; */
    aspect-ratio: 1754/87;
    content: "";
    display: inline-block;
    margin: 10px -20px -20px -20px;
    width: calc(100% + 40px);
    background: url("images/fb_bottom.png");
    background-size: cover;
    background-repeat: no-repeat;
  }

  ul.chatbox{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .him, .me {
    display:inline-block;
    clear: both;
    margin-top: 5px;
    padding: 5px 20px;
    border-radius: 30px;
    margin-bottom: 5px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .chatbox a { color: inherit; }

  .him{
    background: #eee;
    float: left;
    border-bottom-left-radius: 5px;
  }

  .me{
    float: right;
    background: #0084ff;
    color: #fff;
    border-bottom-right-radius: 5px;
  }
</style>

## Summary

Some airlines offer free IP messaging with e.g. iMessage, Facebook Messenger, and WhatsApp.  For example, [United](https://onemileatatime.com/news/united-airlines-free-inflight-messaging/).

But to get real internet, you need to pay.  It's a pretty small fee (~$9 for a domestic flight, IIRC), but I thought we might be able to find a workaround.

The idea: create a Facebook Messenger bot (or other bot) which, when you message it with a url, it will fetch the page and message back the contents.  So, for example:

<div class="chatbox">
<ul class="chatbox">
  <li class="me"> google.com  </li>
  <li class="him"> &lt;html file&gt;  </li>
  <li class="me"> https://www.google.com/search?q=python+walrus+operator  </li>
  <li class="him"> &lt;html file&gt;  </li>
</ul>
<div style="clear:both; margin:0;"> </div>
</div>


## Details

#### Text-only
One stipulation is that the messages are text (and emoji) only - no images/videos/files allowed.  So we can't just directly send the html file (with assets) back.

Instead, we might do something like either send the raw html contents (without extra assets e.g. css/images) or send a screen-reader version.

Or...

#### terminal commands
Rather than requesting / replying a url, we might send curl commands and just reply with the terminal output.  And while we're at it, we might as well just make it a full terminal session!

<div class="chatbox">
<ul class="chatbox">
  <li class="me"> curl http://www.google.com/  </li>
  <li class="him"> &lt;!doctype html&gt;&lt;html itemscope=&quot;&quot; itemtype=&quot;http://schema.org/WebPage&quot; lang=&quot;en&quot;&gt;&lt;head&gt;&lt;meta content=&quot;Search the world's information <br />...<br />  &lt;/body&gt;&lt;/html&gt; </li>
  <li class="me"> pwd </li>
  <li class="him"> /home/gerry </li>
</ul>
<div style="clear:both; margin:0;"> </div>
</div>
