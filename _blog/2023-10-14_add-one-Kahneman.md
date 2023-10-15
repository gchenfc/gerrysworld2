---
title: "Add-1 Task Online Demo"
postType: "miniproject"
description: "An implementation of the \"Add-1\" task described in Daniel Kahneman's <i>Thinking Fast and Slow</i>."
date: Oct 14, 2023
stylesheets: ["/css/blogPost.css", "style.css"]
---

<div class="container-intro">
<div class="intro-content" markdown=1>

## Intro
Nobel Prize in Economics awardee [Daniel Kahneman](https://en.wikipedia.org/wiki/Daniel_Kahneman) has written several books / papers that mention an "Add-1" mental exercise to study our "System 1" (autonomic) vs "System 2" (deliberate) thinking.  I wanted to try it out for myself, so I made this online demo.  Consider checking out Ch. 2 of his book *Thinking Fast and Slow* for more details.

Here's a video of me trying it out (Add-3 variant):
</div>

<!-- [![Add-1 Task Demo](https://img.youtube.com/vi/4QZPZUyq2xY/0.jpg)](https://www.youtube.com/watch?v=4QZPZUyq2xY) -->
<!-- https://youtu.be/a9WvTvfNkvA -->
<!-- [![Add-1 Task Demo](https://img.youtube.com/vi/a9WvTvfNkvA/0.jpg)](https://www.youtube.com/watch?v=a9WvTvfNkvA) -->
<div class="video-container">
    <iframe src="https://www.youtube.com/embed/a9WvTvfNkvA?si=P3WN5on7lGOaigfO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<!-- <iframe width="400" height="375" style="display: block; margin: auto; max-width: 100%; aspect-ratio: 400/375;" src="https://www.youtube.com/embed/a9WvTvfNkvA?si=P3WN5on7lGOaigfO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
</div>

<!-- Intro side-by-side -->
<style>
  .container-intro {
      display: flex;
      flex-wrap: wrap;
      gap: 20px; /* space between columns */
  }

  .container-intro > * {
      margin-bottom: 0;
  }

  .intro-content {
      flex: 1;
      width: 50%;
      box-sizing: border-box;
  }

  .video-container, .video-container::before {
      box-sizing: border-box;
  }

  .video-container {
      flex-shrink: 0; /* Ensure that this container doesn't shrink below the content size */
      position: relative;
      width: calc(1000px - 100%); /* Use calc to maintain the 400/375 aspect ratio based on its parent height */
      max-width: 400px; /* To ensure it doesn't grow beyond the original width */
  }

  @media (max-width: 740px) { /* This value can be adjusted */
      .container-intro {
          flex-direction: column;
      }
      .intro-content {
          width: 100%;
      }
      .video-container {
          width: 100%;
          max-width: 400px;
          aspect-ratio: 400/375;
          margin: auto;
      }
  }

  .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
</style>

## Instructions
The task is described (among other places), on Page 23 of the book [*Attention and Effort*](https://kahneman.scholar.princeton.edu/sites/g/files/toruqf3831/files/kahneman/files/attention_lo_quality.pdf):
* There's 2 options: listen-think-say, or listen-say-say
* During the entire test, record pupil size and watch as it changes size.  Pupil size is an easily measurable response to mental effort.
* The procedure is as follows:
  1. [2s] Receive the which task (listen-think-say or listen-say-say)
  2. [2s] Rest
  3. [4s] **Listen**: "Hear"[^1] a 4-digit number one digit per second
  4. [1s] Rest
  5. [4s] **Think or Say** the number, except add 1 to each digit, e.g. 1234 -> 2345, or 7932->8043
  6. [1s] Rest
  7. [4s] **Say** the add-1 number (again if you already said it once)

[^1]: Actually instead of "hearing" the number, I just display the number of the computer.  This is indeed quite different and IMO much easier than hearing the number.  Drawing from Richard Feynman's observation that we can often multitask with one task using our "visual" system and the other task using our "auditory" system but can**not** multitask if both tasks are using the same system, then displaying the numbers visually means we can read the number with our visual system, (increment is trivial), and "store" the number with our auditory system all while seeing the numbers for the first time.  If, instead, we followed the experiment and listened to the numbers, then I strongly suspect we would not have the bandwidth to both listen and "store" a different number with our auditory system simultaneously.  This difficulty would arise during both the "memorization" and "give-the-answer" phases so the task would be significantly more difficult.  Perhaps if I have time later I can implement a "listen" option.

Visual depiction of the procedure[^1]:
[![Visual timeline depiction of the add-1 procedure](images/add1_timeline_screenshot.png){: style="width: 100%; margin: 0;" class="alt-timeline" }](images/add1_timeline_screenshot.png)

<div class="container">
  <div class="timeline">
    <div class="marker" style="grid-column: span 2;">Receive which task</div>
    <div class="marker" style="grid-column: span 2;">Rest</div>
    <div class="marker" style="grid-column: span 4;">Hear a 4-digit number</div>
    <div class="marker" style="grid-column: span 1;">Rest</div>
    <div class="marker" style="grid-column: span 4;">Think or Say the number</div>
    <div class="marker" style="grid-column: span 1;">Rest</div>
    <div class="marker" style="grid-column: span 4;">Say the add-1 number</div>
    <div class="label">0s</div><div class="label">1s</div><div class="label">2s</div><div class="label">3s</div><div class="label">4s</div><div class="label">5s</div><div class="label">6s</div><div class="label">7s</div><div class="label">8s</div><div class="label">9s</div>
    <div class="label">10s</div><div class="label">11s</div><div class="label">12s</div><div class="label">13s</div><div class="label">14s</div><div class="label">15s</div><div class="label">16s</div><div class="label">17s</div><div class="label">18s</div>
    <div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div><div class="dummy"></div>
  </div>
</div>

<style>
    .container {
        /* border: 1px solid #888; */
        overflow-x: scroll;
    }
    @media (max-width: 640px) { /* This value can be adjusted */
        .container { display: none; }
    }
    @media (min-width: 640px) { /* This value can be adjusted */
        .alt-timeline { display: none; }
    }
    .timeline {
        display: grid;
        grid-template-columns: repeat(18, 1fr);
        width: calc(100% - 30px);
        margin: 0 15px 0 15px;
        min-width: 550px;
    }
    .marker {
        grid-row: 1;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        border-bottom: black 1px solid;
        margin: 0;
        background-color: #f8f8f8;
    }
    .marker:nth-child(odd) {
        background-color: #eee;
    }
    .label {
        grid-row: 3;
        grid-column: span 1;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        transform: translateX(-50%);
        width: 0;
        margin: 0;
    }
    .dummy {
        grid-row: 2;
        grid-column: span 1;
        transform: translateX(-50%);
        width: 0;
        height: 10px;
        border-right: black 1px solid;
        margin: 0;
    }
</style>

<!-- <div style="height: 150px;">
<div id="display2">[Demo Runs Here]</div>
</div> -->

## Demo

<div class="wrap-collapsible">
  <input id="collapsible" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="collapsible" class="lbl-toggle">Help?</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

#### Demo Options
* Recording: You may enable webcam recording so that you can go back and watch (and download) a video of your pupils.  You may want to get really close to the screen and shine a flashlight at your eyes if you have dark colored eyes.
* Task selection: Although the results ([pg 23](https://kahneman.scholar.princeton.edu/sites/g/files/toruqf3831/files/kahneman/files/attention_lo_quality.pdf)) were stated that it didn't make much difference whether the middle item was to "think" or "say" compared to the overall task difficulty, I still give the option to let the computer randomly select which one you should do, as in the experiment.
    This only changes the text displayed but not the behavior.  
* Variant Selection: You can try 3 variants:
  1. Repeat the same number
  2. Add-1: Add 1 to each digit (e.g. 1234 -> 2345 or 7932 -> 8043)
  3. Add-3: Add 3 to each digit (e.g. 1234 -> 4567 or 7932 -> 0265)

  This only changes the text displayed but not the behavior.

</div>
  </div>
</div>

<div id="options">

  <div title="You may enable webcam recording so that you can go back and watch (and download) a video of your pupils.  You may want to get really close to the screen and shine a flashlight at your eyes if you have dark colored eyes.">
    <input type="checkbox" id="enableRecording" name="recordingOption">
    <label for="enableRecording">Enable pupil recording?</label>
    <div id="recordingStatus" style="padding: 8px; margin:0; "></div>
  </div>

  <div class="radioContainer" id="mode-select" title="Although the results ([pg 23](https://kahneman.scholar.princeton.edu/sites/g/files/toruqf3831/files/kahneman/files/attention_lo_quality.pdf)) were stated that it didn't make much difference whether the middle item was to think or say compared to the overall task difficulty, I still give the option to let the computer randomly select which one you should do, as in the experiment.
  This only changes the text displayed but not the behavior.">
    Which Task:<br />
    <input type="radio" id="listen-think-say" name="task-type" value="listen-think-say">
    <label for="listen-think-say">Listen-Think-Say</label>
    <br />
    <input type="radio" id="listen-say-say" name="task-type" value="listen-say-say">
    <label for="listen-say-say">Listen-Say-Say</label>
    <br />
    <input type="radio" id="random" name="task-type" value="random" checked>
    <label for="random">Random</label>
  </div>

  <div class="radioContainer" id="task-select" title="You can try 3 variants:
  1. Repeat the same number
  2. Add-1: Add 1 to each digit (e.g. 1234 -> 2345 or 7932 -> 8043)
  3. Add-3: Add 3 to each digit (e.g. 1234 -> 4567 or 7932 -> 0265)
  This only changes the text displayed but not the behavior.">
    Which Variant:<br />
    <input type="radio" id="task1" name="task-variant" value="0">
    <label for="task1">Repeat the number</label>
    <br />
    <input type="radio" id="task2" name="task-variant" value="1" checked>
    <label for="task2">Add-1</label>
    <br />
    <input type="radio" id="task3" name="task-variant" value="3">
    <label for="task3">Add-3</label>
  </div>

  <div>
    <label for="numRuns">Number of Runs:</label>
    <input type="number" id="numRuns" name="numRuns" min="1" max="10" value="1">
  </div>

</div>

<!-- <div id="recordingStuff">
  <button onclick="startRecording()">Start Recording</button>
  <button onclick="stopRecording()" disabled>Stop Recording</button>
  <span id="recordingStatus" style="width: 100px; padding: 8px;"></span>

  <br><br>
  <video id="videoElement" style="display: none;" controls></video>
</div> -->

<div id="Main">
  <button onclick="startDemo()" id="start">Start!</button>
  <div id="display">[Demo Runs Here]</div>
</div>

<video id="videoElement" style="display: none;" controls></video>
<button id="downloadButton" style="display: none; margin-top: 5px;">Download Video</button>

<style>
    #options {
      height: fit-content;
      margin: 0;
    }
    #options > *:not(:last-child) {
      margin-right: 20px;
    }
    #options > * {
      border: 1px solid #ddd;
      padding: 5px;
      display: inline-block;
      vertical-align: top;
    }
    .radioContainer {
      height: fit-content;
      min-width: fit-content;
    }
    #display, #display2 {
        font-size: 24px;
        margin-top: 20px;
        text-align: center;
    }
    #start {
      font-size: 20px;
      padding: 5px;
    }
</style>

<!-- Demo js code -->
<script>
  // script.js
  const display = document.getElementById('display');
  // const display2 = document.getElementById('display2');
  let running = false;

  function getRandomFourDigitNumber() {
      return Math.floor(1000 + Math.random() * 9000);
  }

  function addNToEachDigit(num, toAdd) {
      return num.split('').map(n => (parseInt(n) + toAdd) % 10).join('');
  }

  async function displayMessage(message, duration) {
      display.innerHTML = (message == "") ? "&nbsp" : message;
      // display2.innerHTML = (message == "") ? "&nbsp" : message;
      return new Promise(resolve => setTimeout(resolve, duration));
  }

  async function displayNumberSequence(num) {
      for (let digit of num.toString()) {
          await displayMessage(digit, 900);
          await displayMessage("", 100);
      }
  }

  async function runSequence() {
      const numRuns = document.getElementById("numRuns").value;
      if (numRuns > 5) {
        if (!confirm(`Are you sure you want to run ${numRuns} times?  Each run takes 19s so this will take ${Math.round(numRuns * 19 / 60)} minutes and ${numRuns * 19 % 60} seconds.`)) return;
      }
      const toRecord = document.getElementById("enableRecording").checked;
      if (toRecord) {
        display.innerHTML = "Initializing Webcam";
        // display2.innerHTML = "Initializing Webcam";
        await startRecording();
      }

      for (let i = 0; i < numRuns; i++) {
        let taskType = document.querySelector('input[name="task-type"]:checked').value;
        switch (taskType) {
          case "listen-think-say":
            taskType = "Listen-<b>Think</b>-Say";
            break;
          case "listen-say-say":
            taskType = "Listen-<b>Say</b>-Say";
            break;
          case "random":
            taskType = Math.random() > 0.5 ? 'Listen-<b>Think</b>-Say' : 'Listen-<b>Say</b>-Say';
            break;
          default:
            taskType = "Listen-<b>Think</b>-Say";
        }
        const action = taskType.includes('Think') ? 'Think' : 'Say';

        await displayMessage(`Task: ${taskType}`, 2000);
        await displayMessage('Get Ready... [2s]', 2000);

        const randomNumber = getRandomFourDigitNumber().toString();
        await displayNumberSequence(randomNumber);

        await displayMessage('', 1000);

        // const modifiedNumber = addOneToEachDigit(randomNumber);
        await displayMessage(`${action} the 1st digit of the modified number`, 1000);
        await displayMessage(`${action} the 2nd digit of the modified number`, 1000);
        await displayMessage(`${action} the 3rd digit of the modified number`, 1000);
        await displayMessage(`${action} the 4th digit of the modified number`, 1000);

        await displayMessage('Rest... [1s]', 1000);

        await displayMessage(`Say the 1st digit of the modified number`, 1000);
        await displayMessage(`Say the 2nd digit of the modified number`, 1000);
        await displayMessage(`Say the 3rd digit of the modified number`, 1000);
        await displayMessage(`Say the 4th digit of the modified number`, 1000);

        let taskVariant = document.querySelector('input[name="task-variant"]:checked').value;
        const modifiedNumber = addNToEachDigit(randomNumber, parseInt(taskVariant));

        if (i < numRuns - 1) {
          await displayMessage(`Expected ${modifiedNumber}.<br />Rest before next run [1s]`, 1000);
        } else {
          await displayMessage(`Done.<br />Did you say ${modifiedNumber}?<br />Press "Start" to run again.`, toRecord ? 1000 : 1);
        }
      }

      if (toRecord) stopRecording();
  }

  function startDemo() {
      if (running) return;
      document.getElementById("start").disabled = true;
      running = true;
      runSequence().then(() => {
        running = false;
        document.getElementById("start").disabled = false;
      });
  }
</script>

<!-- Recording stuff -->
<script>
    let mediaRecorder;
    let recordedChunks = [];
    let stream;

    document.getElementById("enableRecording").onchange = function() {
        // if (this.checked) {
        //     document.getElementById("recordingStuff").style.display = "block";
        // } else {
        //     document.getElementById("recordingStuff").style.display = "none";
        // }
    };

    function setStatus(status) {
        document.getElementById("recordingStatus").innerHTML = status ? "Recording" : "Not Recording";
        if (status) {
            document.getElementById("recordingStatus").style.color = "white";
            document.getElementById("recordingStatus").style.backgroundColor = "red";
        } else {
            document.getElementById("recordingStatus").style.color = "black";
            document.getElementById("recordingStatus").style.backgroundColor = "#eee";
        }
    }
    setStatus(false);

    async function startRecording() {
        recordedChunks = [];

        // Access the webcam
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        // Create the media recorder
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.onstart = () => {
            setStatus(true);
        };

        // On data available, push it to our array
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // When recording stops, create a blob and display the video
        mediaRecorder.onstop = () => {
            setStatus(false);
            const videoBlob = new Blob(recordedChunks, {
                type: 'video/webm'
            });
            const videoUrl = URL.createObjectURL(videoBlob);
            document.getElementById('videoElement').src = videoUrl;
            document.getElementById('videoElement').style.display = "block";
            document.getElementById('downloadButton').style.display = "block";
            setDownloadLink(videoUrl);
        };

        // Start the recording
        mediaRecorder.start();
        // document.querySelector("[onclick='stopRecording()']").disabled = false;
        document.getElementById('downloadButton').style.display = "none";
        document.getElementById('videoElement').style.display = "none";
    }

    function stopRecording() {
        // Stop the media recorder
        mediaRecorder.stop();

        // Stop the webcam stream
        stream.getTracks().forEach(track => track.stop());

        // document.querySelector("[onclick='stopRecording()']").disabled = true;
        // document.getElementById("recordingStuff").style.display = "block";
    }

    function setDownloadLink(videoUrl) {
      // Set up the download link
      const downloadButton = document.getElementById('downloadButton');
      downloadButton.style.display = "block"; // Enable the download button
      downloadButton.addEventListener('click', () => {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = videoUrl;
          a.download = 'Add1_Recording.webm'; // Name the downloaded file
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
              document.body.removeChild(a);
          }, 100);
      });
    }
</script>

<!-- Divider bar for footnotes -->
---
### Footnotes
