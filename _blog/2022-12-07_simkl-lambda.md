---
title: "Netlify Serverless Functions and AWS DynamoDB"
postType: "tutorial"
description: "For fun and practice, I decided to add a feed of my most recently watched movies/shows using serverless (\"lambda\") functions."
date: Dec 7, 2022
stylesheets: ["/css/blogPost.css", "/css/simkl_feed.css"]
redirect_from: "/blog/2022-12-07.html"
---

<div class="wrap-collapsible">
  <input id="collapsible" class="toggle" type="checkbox" checked> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible" class="lbl-toggle">Table of Contents</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

- [Introduction](#introduction)
  - [Example Task](#example-task)
- [Approach](#approach)
  - [Alternatives](#alternatives)
  - [Outline](#outline)
  - [Function 1: Periodically poll Simkl to cache my watch data onto AWS](#function-1-periodically-poll-simkl-to-cache-my-watch-data-onto-aws)
      - [Simkl API](#simkl-api)
      - [AWS DynamoDB API](#aws-dynamodb-api)
  - [Function 2: Serve watchlist from AWS to client](#function-2-serve-watchlist-from-aws-to-client)
  - [Client-side Javascript](#client-side-javascript)
- [Conclusions](#conclusions)

</div>
  </div>
</div>

## Introduction
As compared to server-"full" functions which involve an always-running server to respond to API requests, serverless functions (also sometimes called "lambda functions" à la functional programming) have become increasingly popular with the rise of static site creation tools (e.g. Jekyll) and hosts as a way to add some dynamic functionality to a site without setting up a full-blown web server yourself.  Instead of managing a full virtual machine, serverless functions allow you to just code the stuff you actually care about in your language of choice while the serverless provider handles all the infrastructure and scaling.  The rise of microservices has also increased the popularity of serverless functions as more flexible and independent backend solutions.

### Example Task
I would like to display a feed of my most recently watched movies/shows to my website [homepage](/), to give a little more personality.  I've reproduced the feed here for reference:

<div style="border: 2pt red dashed">
  <h5>Recent Shows/Movies I've Watched</h5>
  <div class="simkl_feed hidden_scrollbar" id="simkl_feed">
  </div>
</div>

<script src="/scripts/simkl_feed.js"></script>

I mostly track what I watch using [Simkl](https://simkl.com/) (with the hope that someday I can use the data to create better recommendations, and also to just remember what series I want to keep up with when new episodes drop).

Simkl already has a nice [official API](https://simkl.docs.apiary.io/) where you can query this data, and also a good [profile dashboard](https://simkl.com/5517686/dashboard/) for each user, but there's 2 main problems with trying to embed this directly on my site:
1. To use the API to get my watch history, you need a (private) API key and access token for my user account.
2. To update the feed client-side, we would face issues with CORS, which prevents sites from accessing other sites without user consent.  This is intended to prevent sites from performing malicious actions from the user's computer.

Therefore, we want a way to query for the data "server-side" and display it on the client side.

## Approach

### Alternatives
I can think of 3 high-level approaches:
1. At a regular interval, fetch the new data and re-build my static website.
2. Each time a user loads my website, the server will fetch the Simkl data and populate the feed before sending the page to the user.
3. Each time a user loads my website, they will first load the page, whose Javascript will make a client-side request to the serverless function (hosted on my website, to avoid CORS issues) to populate the feed.

Option 1 is feasible but really quite hacky.  Perhaps this might be ok if you're really lazy and using something like Github Actions which has great CI support but poor serverless support, but it's not really the "right" way to do things in most cases.

Option 2 was the "standard" way to do things for a while, but seems to be less popular now.  Traditionally, the website server would generate the data and insert it into the page on-the-fly upon a client request and then just sends the client the complete page.  This lessens the burden on the client and reduces the number of transactions at the cost of increased latency: the client can't see anything at all until after the server fills in the data and sends the complete webpage.

Option 3 is the "new" "standard" way to do things.  The client browser (upon loading the website) would send a request to the website server for the additional data then fill in the webpage's feed itself.

### Outline
To implement option 3, I will create 2 serverless functions:
1. one which periodically polls Simkl to cache up-to-date information on AWS, and
2. one which serves the AWS info to the client.

You may be wondering why go through AWS at all.  Why not just query Simkl upon client request and serve that data directly to the client?  To be honest, this would probably work fine, but I had a few weak reasons that I wanted to do this:
1. Practice - I wanted to practice interfacing with more technologies.
2. Backup - I wanted to periodically back-up my Simkl data on another server (in this case, AWS DynamoDB) in case it ever went down or broke or anything, and this was a 2-birds-1-stone moment.
3. Rate limits - with my API key, I have a limited number of Simkl requests per month or else they will boot me.  I think it's vanishingly unlikely that I would hit these rate limits based on my site traffic, but in theory it is more scalable to rely on your own API endpoint rather than someone else's.
4. Latency - AWS might be faster than Simkl.  Or not, who knows.

### Function 1: Periodically poll Simkl to cache my watch data onto AWS

This function is a "scheduled" function, meaning it runs at a pre-configured regular interval.  I set it to run hourly on the top of every hour.  Its purpose is to get the latest updates from Simkl and copy it onto AWS.

The code is available [here](https://github.com/gchenfc/gerrysworld2/blob/master/netlify/functions/hourly_simkl/hourly_simkl.ts).

At a high level, it's pretty simple.  It just queries the Simkl API to get my full watch history then uploads it to AWS DynamoDB using the node.js aws-sdk package.  The netlify `schedule` function imported from the `@netlify/functions` Node.js package makes scheduling this function to run every hour easy:
```typescript
const handler = schedule("@hourly", myHandler)
```

##### Simkl API
Figuring out the Simkl API's authentication took a short while partly because I'm not experienced but partly also because the documentation is confusing.  To be properly authenticated, you first need to create a developer `client_id` which identifies the app/application you're making.  Then, you need to create a user `code` to authorize your app to access that user's information.  Finally, you need to turn that code into an `access_token` which you include in every subsequent request to prove that you got the user's permission and are allowed to access their data.  Note that one confusing aspect is that they use confusing notation for how to provide the `access_token` authentication: for many API endpoints (e.g. [get watchlist](https://simkl.docs.apiary.io/#reference/sync/get-all-items/get-all-items-in-the-user's-watchlist)), they just say "Token Required" but don't tell you how to supply the token.  In their "example", they have `Authorization: Bearer [token]` and `simkl-api-key: [client_id]`.  The correct way to do this is that the `access_token` goes in place of `[token]` and the `client_id` goes in place of `[client_id]`.  So, for example, `Authorization: 0123456789abcde` and `simkl-api-key: 9876543210deadbeef`.  This tripped me up for a while because I thought `Bearer [token]` was the _name_ of the authorization mode and that I was supposed to give another value `access_token: 0123456789abcde` or something.  Finally I noticed the square brackets around `[token]` and facepalmed.

##### AWS DynamoDB API
Getting AWS's credentials working on Netlify was relatively straightforward.  You set the keys as environment variables in Netlify, then just construct an `AWS.DynamoDB` service object with those credentials.  The only tricky part is that Netlify doesn't allow you to use the environment variable `AWS_ACCESS_KEY_ID` or `AWS_SECRET_KEY` since presumably Netlify is using those themselves for their own AWS account.  The solution is that you can just use any other environment variable names, and then you have to specify the credentials in Node.js:
```typescript
const ddb = new AWS.DynamoDB({
  'accessKeyId': process.env.MY_AWS_ACCESS_KEY_ID,
  'secretAccessKey': process.env.MY_AWS_SECRET_KEY
});
```
It's fortunate that AWS has a constructor which takes in the authentication credentials manually.

### Function 2: Serve watchlist from AWS to client
This function is much easier: in the handler, we just need to read from the AWS DynamoDB database and return the data.  Netlify makes it such that the endpoint to call this function is just `site.name.com/.netlify/functions/filename`, where `filename` does _not_ have an extension.  When you GET or POST to that url, you get the returned data back in JSON form, and since it's hosted on Netlify / accessible with the same TLD (gerry-chen.com for my case), we don't have to deal with CORS issues.

One thing that tripped me up for a minute was that, even if your functions are in a folder called `/netlify/functions`, the endpoint will still be `/.netlify/functions`, paying special attention to the "dot" in front of "netlify".

You can view the full code [here](https://github.com/gchenfc/gerrysworld2/blob/master/netlify/functions/fetch_simkl/fetch_simkl.ts)

### Client-side Javascript
This is straightforward HTML/JavaScript/CSS and not the focus of this blog post.  You can view the full code here: [index.md](https://github.com/gchenfc/gerrysworld2/blob/master/index.md), [simkl_feed.js](https://github.com/gchenfc/gerrysworld2/blob/master/scripts/simkl_feed.js), [simkl_feed.css](https://github.com/gchenfc/gerrysworld2/blob/master/css/simkl_feed.css).  The JavaScript just merges the lists of TV Shows, Movies, and Anime I've watched into 1 list, sorts, and outputs the info into HTML elements.

## Conclusions
In this post, I introduced serverless (lambda) functions, described an example problem, and went through 2 examples of serverless functions using Netlify including accessing a 3rd party API and reading+writing from an AWS database.  I showed how serverless functions can be quick and easy to work with.  I, for one, had a very enjoyable time and look forward to the next opportunity I get to use serverless functions :).

Hopefully this was helpful :)
