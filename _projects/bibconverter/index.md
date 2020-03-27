---
title: "BibTeX-to-HTML Citation Generator"
description: "An AWS-powered online citation generator.  Upload a bibtex file and copy/paste the formatted citations."
status: 'completed'
displaydate: "Mar. 27, 2020"
date: Mar. 27, 2020

image: "converter2.png"
imageAltText: "bibtex converter screenshot"

sidepic: "lambda.png"
sidepicfull: "lambda.png"
sidepicAltText: "AWS backend"

js: ["https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
     "bibtest/webpage/script.js"]
---

<div style="clear:both; margin:0"></div>
<a href="./bibtest/webpage/index.html">(click here for barebones)</a>
<div class="hello" style="padding:10px; box-shadow: 0px 0px 20px 2px #ff51faa8; background-color: #efeedb; max-width:800px;">
    <h1 align="center" style="margin-top: 0px">bibtex references generator (IEEE format)</h1>
    <div id="uploadcontainer" style="float:left; border-style:solid; border-width:thin; padding:20px; margin:40px; margin-top:10px; text-align:center;">
        <h2 style="margin-top: 0">Upload a bibtex file</h2>
        <input id="inputfile" type="file" accept=".bib" onchange="onFileChange(this);">
        <br />
        <button id="removeimgbutton" onclick="removeImage()" hidden="true">Remove</button>
        <button id="uploadimgbutton" onclick="uploadImage()" hidden="true">Convert!</button>
    </div>
    <div id="resultcontainer" style="float:right; border-style:solid; border-width:thin; padding:20px; margin:40px; margin-top:10px; font-family: times;">
        <h2 align="center" style="margin-top: 0; text-align:center">Works Cited</h2>
        <a id="htmllink" hidden="true">Click here to download the bare html!</a>
        <div id="result" style="font-size: 9pt; line-height: 9pt;"><h3 align="center">Please upload a bib file...</h3></div>
    </div>
    <div style="clear:both; margin:0"></div>
</div>

## Introduction
BibTeX is awesome.  It's an effortless way to keep track of citations which most any publisher offers for papers.  It contains the metadata for citations which can then be used when writing LaTeX documents.  Sometimes, though, I just want a quick and easy way to generate citation(s) for a given bibtex file (ie quick reference in a powerpoint slide) without creating a "dummy" latex file just to get one citation.  That's why I created this automatic citation maker.  Upload your bibtex file and it will generate a list of citations in HTML/text form.

## Code Overview
The file upload uploads the bib file to an AWS S3 bucket and triggers an AWS Lambda instance to begin processing.  The Lambda instance converts the bib file to an HTML bibliography using [`pandoc`](https://pandoc.org) with the help of a template tex file, and re-uploads the HTML file to S3 so that your browser can fetch it.

Some notes:

* When clicking upload, actually a Lambda instance presigns an S3 bucket link which gets sent back to the browser and then the browser can upload it to S3
* CORS - both the client's request ("preflight") and the server's response ("request") matter and must be configured.
* The converting Lambda function needs a "Layer" containing the [pandoc binaries](./bibtest/pandoc_binaries.zip).  The pre-existing [Serverless App Repository's Lambda Layer](https://github.com/serverlesspub/pandoc-aws-lambda-binary) was great except they didn't include the `pandoc-citeproc` binary, so I recompiled using their scripts and made a new layer.
* Someday maybe I'll add support for additional styles other than just IEEE.  Pandoc/Lambda can already do it easily, it's just a matter of making a dropdown or something to select which style you want.  I'm too lazy and also don't see myself needing other formats for the foreseeable future.

## Code
The [code](bibtest) is very disorganized and lacking documentation.  Contact me if you have any questions.