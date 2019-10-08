---
title: "Semi-dense Reconstruction Using Surfels"
description: "A project to replicate the results of Wang, Gao, & Shen's 2019 ICRA paper (image credit to their paper)"
status: 'in progress'
displaydate: "Oct, 2019"
date: Oct 2, 2019

image: "theirPic.png"
imageAltText: "surfel map"

sidepic: "theirPic.png"
sidepicfull: "theirPic.jpg"
sidepicAltText: "surfel map"
stylesheets: ["/css/projectPost.css", "/css/slideshowGallery.css"]
---

## Introduction
This is the final project for my team's CS6476 (Computer Vision) class.  An excerpt from our [project proposal](proposal.html):

> One of the fundamental tasks for robot autonomous navigation is to perceive and digitalize the surrounding 3D environment.[1] To be usable in mobile robot applications, the mapping system needs to fast and densely recover the environment in order to provide sufficient information for navigation.
>
> Unlike other 3d reconstruction methods that reconstructs the environment as a 3D point cloud, we hope to extract surfels [2, 3, 4] based on extracted superpixels from intensity and depth images and construct a surfel cloud. This approach is introduced by [5] which can greatly reduces the memory burden of mapping system when applied to large-scale missions. More importantly, outliers and noise from low-quality depth maps can be reduced based on extracted superpixels.
> 
> The goal of our project is to reproduce results of Wang et al’s, namely implementing superpixel extraction, surfel initialization, and surfel fusion to generate a surfel-based reconstruction given a camera poses from a sparse SLAM implementation. The input to our system will be an RGB-D video stream with accompanying camera poses and the output will be a surfel cloud map of the environment, similar to Figures 4b or 8 of the original paper [5].

## Project Proposal
Please see our [project proposal](proposal.html)

## Github
Please see our [github](https://github.com/Alexma3312/Dense-Mapping)