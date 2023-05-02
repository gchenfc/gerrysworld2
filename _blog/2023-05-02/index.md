---
title: "Playing with NeRF"
postType: "random"
description: "Procrastinating, I created a NeRF from a video I took about a month ago."
date: May 2, 2023
stylesheets: ["/css/blogPost.css", "style.css"]
---

<style>
  .sidepic {
    width: 40%;
    display: block;
    float: right;
    margin-top: -150px;
  }

  .gdriveVideo {
    max-width: 200px;
    width:90%; 
    /* height:415;  */
    /* max-height: 50vh; */
    margin: auto;
    display:block;
  }

  .wide { max-width: 600px; }

  .fullwide { max-width: 100%; width: 100% }

  .collapsible-content .content-inner { max-height: 50vh; }

  .column {
    float: left;
    width: 33.33%;
    padding: 5px;
  }

  /* Clear floats after image containers */
  .row::after {
    content: "";
    clear: both;
    display: table;
  }
</style>

<!-- Side pic -->
<video class="sidepic" autoplay muted loop><source src="https://drive.google.com/uc?export=view&id=1ZschsGeySWdWntPb68JUDT74uS277wys" type='video/mp4'></video>

# Introduction

I had already had some experience with [nerfstudio](https://docs.nerf.studio/en/latest/index.html) for a research project, so I knew how easy and fast it is to create NeRFs.  Procrastinating very important work, I decided to create a simple NeRF as a fun demo to show my less technically inclined friends/family what NeRFs are all about, and to give some context of how approachable they are.

<div class="wrap-collapsible">
  <input id="what-are-nerfs" class="toggle" type="checkbox"> <!-- delete "checked" to default to unchecked -->
  <label for="what-are-nerfs" class="lbl-toggle h2">What are NeRFs?</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

**Ne**ural **R**adiance **F**ields is a relatively recent technique for rendering photorealistic 3D scenes from a set of images.  If you're familiar with Structure-from-Motion or Photogrammetry, it's kind of like a deep-learning version of that.  Although it's an implicit radiance field representation rather than point clouds, to the lay-person it creates similar (but way better) results as a densification (multi-view stereo aka MVS) step.  Lots of information available online so I won't go into further details.

</div>
  </div>
</div>


<div class="wrap-collapsible">
  <input id="troubleshooting" class="toggle" type="checkbox" checked> <!-- delete "checked" to default to unchecked -->
  <label for="troubleshooting" class="lbl-toggle h2">Installation Troubleshooting</label>
  <div class="collapsible-content">
    <div class="content-inner" markdown=1>

FWIW, nerfstudio is amazing - highly recommend.  The only tricky part is getting tiny-cuda-nn installed properly, but I highly recommend toughing through it since it's pretty much mandatory to get fast-training NeRFs for all the popular NeRF packages.  It cuts training time down from ~2.5 hours to ~15 minutes.

I highly recommend using conda/pip and letting it figure out the cuda dependencies and such (as opposed to requiring sudo and stuff for cuda versions).  As long as nvidia-smi doesn't give errors, then conda will be able to install the correct cuda versions etc.  I ran with cuda 11.7 and pytorch 1.13.1 (in nerfstudio instructions).

Note that (like me) you might get an error during tiny-cuda-nn install that the cuda version doesn't match the version pytorch was installed with:

> The detected CUDA version (10.1) mismatches the version that was used to compile PyTorch (11.7). Please make sure to use the same CUDA versions.

Assuming that the PyTorch version (11.7 in this case) is the version of cuda that you want to be using (and 10.1 would be the system cuda version, e.g. in `/usr/lib/cuda/version.txt`), this is because the conda/pip package for tiny-cuda-nn isn't smart enough or is missing some dependency or something.

**The fix**: you need to
```
conda install cuda-nvcc=11.7 -c nvidia
```
and you might also need `conda install pytorch-cuda=11.7 cuda-toolkit=11.7.1 -c nvidia` as well.  If it's still not working, you may have a linking issue where pip build from source is using system cuda compiler instead of conda cuda compiler, but I didn't have to face this so I don't know how to fix it, but it shouldn't be too difficult (maybe as a hack add conda lib path to `LD_LIBRARY_PATH` or something).

</div>
</div>
</div>

# Input Video
The input video I used is shown below:
<video class="gdriveVideo" preload="auto" autoplay loop muted controls>
   <source src="https://drive.google.com/uc?export=view&id=1fiHSxnGYoG84ZMcaFZk6k9uUUE3Xu3Wj" type='video/mp4'>
</video>
Note that I shot this on my iPhone at 240fps ("slow-mo") to try to reduce motion blur.  I also have another video shot at the usual 30fps, but didn't test to see if the results were better/worse, though I doubt it makes much of a difference.  Then I downsampled the 240fps down to 30fps with `ffmpeg -i input.mp4 -r 30 output.mp4` and preprocessed using nerfstudio's
```sh
ns-process-data video \
  --data data/nerfstudio/VA_SB_pier/IMG_8527_30fps.mp4 \
  --output-dir data/nerfstudio/VA_SB_pier \
  --num-frames-target 50
```
I tried both with the full 305 frames (default) and with only 50 frames (as in the command above).

# Results

## Videos

### Zoom 1

<!-- Zoom 1 -->
<video class="gdriveVideo wide" preload="auto" autoplay muted loop controls><source src="https://drive.google.com/uc?export=view&id=1_9fI3NNlJ7SMgR2jmcdvWBbIOvHfm_sW" type='video/mp4'></video>


### Zoom 2
Left: 50 frames, Right: 305 frames
<video class="gdriveVideo fullwide" preload="auto" autoplay loop muted controls><source src="https://drive.google.com/uc?export=view&id=1E1pTK3r1bnPCTZf4A7ofurNpoClWks4g" type='video/mp4'></video>

### Circle
Left: 50 frames, Right: 305 frames
<video class="gdriveVideo fullwide" preload="auto" autoplay loop muted controls><source src="https://drive.google.com/uc?export=view&id=1qWuDxu85q9tUbYJb0HQn3QoPQIvBRsGS" type='video/mp4'></video>

<br />

Comparing the left (every 6th frame) and the right, the only difference appears to be the amount of clouds/whispies, presumably because more frames means more 3D supervision.  Probably also has something to do with eval images (90/10 train/val split).

## Point Clouds

Generated using nerfstudio.

<div class="gdriveVideo fullwide row" markdown="1">
  <div class="column"><img style="width:100%;margin:0;" src="https://drive.google.com/uc?export=view&id=1DJ7DQbRCJa-RrvFmPnhcBvA6ZJS-GxRu" /></div>
  <div class="column"><img style="width:100%;margin:0;" src="https://drive.google.com/uc?export=view&id=1YCfQDeb7ztvSwzFB0XLZHN7tWUCcAVbY" /></div>
  <div class="column"><img style="width:100%;margin:0;" src="https://drive.google.com/uc?export=view&id=1erH1Shb6pVJAdTTHrQMkrIzLg4XNsGe1" /></div>
</div>


[Download ply file, 50 frames version](https://drive.google.com/uc?export=view&id=1otfPZVwXkSMDja772OBwJgMdst7BhHb9)  
[Download ply file, 305 frames version](https://drive.google.com/uc?export=view&id=1NZVJMPZ0Ob2TiGvn4Z_vbICpmr95oOQL)  
(may take a second after clicking to begin download)

## Evaluation Images

Left: Ground Truth, Right: NeRF view synthesis (305 frames)
<div class="gdriveVideo wide"><img style="width: 100%; margin:0;" src="https://drive.google.com/uc?export=view&id=1O102jWFlDpvtombVrUAQAv1sHhR9koCB"></div>

Observe that the NeRF result is a bit pixelated / not max quality.  Probably somewhere I forgot to change a default setting and it's using downsampled images, or the network config I'm using is just too small, or the non-centered scene is causing poor numerical issues since the majority of the "interesting" bits of the scene are actually outside the [-1, 1] scene box.

## Training Speed

Training (on RTX 3080) achieved decent results after just a few seconds, very good results after just 1 min, and basically full quality results after 3-4 minutes.  I ran them for 10 minutes but they didn't get much better.  Using full resolution or larger network may have achieved better results.

[wandb link](https://wandb.ai/gchenfc/nerf_personal/runs/ue1jqbvv?workspace=user-gchenfc)

<div class="gdriveVideo wide"><img style="width: 100%; margin:0;" src="https://drive.google.com/uc?export=view&id=1XEJAUIyIvpa3KfE_1XH1SaR2IjFNwT2J"></div>

# Conclusions

NeRF is very cool and open-source tools have made it super easy to generate great-looking NeRFs from very standard videos!  You should try if you haven't already :)

# All media
All the videos/pointclouds/etc. are backed up on [google drive](https://drive.google.com/drive/folders/1gkdk-7oNnXr7hs_NFj-lzgkgc85iLQPY?usp=share_link).
