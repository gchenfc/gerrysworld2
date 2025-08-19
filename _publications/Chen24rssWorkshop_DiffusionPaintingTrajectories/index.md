---
title: "Dynamics-Aware Trajectory Generation for Artistic Painting using Diffusion"
author: "<u>Gerry Chen</u>, Frank Dellaert, and Seth Hutchinson"
journal: "2024 RSS Workshop: Generative Modeling meets HRI (GenAI-HRI)"
year: "2024, in press"
date: Jul 15, 2024
img: "graffiti_1.svg"
# img: "unconditioned_cropped2.png"
# img: "unconditioned.png"
category: "proceedings"
Poster: "Chen24rssWorkshop_DiffusionPaintingTrajectories/Chen24rssWorkshop_poster.pdf"
PDF: "Chen24rssWorkshop_DiffusionPaintingTrajectories/Chen24rssWorkshop_DiffusionPaintingTrajectories.pdf"
links:
  Live Demo: "https://demo.gerry-chen.com/diffusion/"
  Workshop: "https://sites.google.com/view/gai-hri-2024#h.is5zc8lcnuki"
---

---

## [Click here for Live Demo!](https://demo.gerry-chen.com/diffusion/)
Draw your own shapes and watch the model modify it!

Note: This live demo may or may not be available depending on the current state of the server.  Please reach out if you believe it is not working and you would like me to turn it on.

## [Click here for paper pdf](Chen24rssWorkshop_DiffusionPaintingTrajectories.pdf)

## [Click here for the poster pdf](Chen24rssWorkshop_Poster.pdf)
[![Poster on "Dynamics-Aware Trajectory Generation for Artistic Painting using Diffusion"](Chen24rssWorkshop_Poster.svg)](Chen24rssWorkshop_Poster.pdf)

---

#### Abstract

In this work, we seek to generate robot trajectories for artistic painting which exploit the dynamics unique to a robot embodiment. Denoising Diffusion Probabilistic Models (DDPM) have been shown to be effective at generating not only images, but also many other continuous signals including robot trajectories and stroke-based drawing paths. While existing works generating stroke-based art using DDPMs produce computer renderings of drawings, many roboticists and artists have previously identified the value in creating physical artwork with an embodied AI. One notable quality of artwork is the particularities of the medium and tools used. Therefore, we seek to combine artistic stroke generation and dynamics-aware trajectory generation using DDPM to generate strokes that capture both the artistic qualities of the training data and of the robot embodiment. We compare several approaches to extending stroke generation DDPMs to respect robot dynamics, including alternative parameterizations, training on modiﬁed data, classiﬁer guidance, and classiﬁer-free guidance. We qualitatively show that classiﬁer-free guidance most effectively exploits the robot embodiment to generate visually pleasing yet dynamically feasible painting trajectories.
