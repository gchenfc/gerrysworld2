---
title: "Dynamics-Aware Trajectory Generation for Artistic Painting using Diffusion"
author: "<u>Gerry Chen</u>, Frank Dellaert, and Seth Hutchinson"
journal: "2024 RSS Workshop: Generative Modeling meets HRI (GenAI-HRI)"
year: "2024, in press"
date: Jul 15, 2024
PDF: "Chen24rssWorkshop_DiffusionPaintingTrajectories/Chen24rssWorkshop_DiffusionPaintingTrajectories.pdf"
img: "graffiti_1.svg"
# img: "unconditioned_cropped2.png"
# img: "unconditioned.png"
category: "proceedings"
Poster: "Chen24rssWorkshop_DiffusionPaintingTrajectories/Chen24rssWorkshop_poster.pdf"
PDF: "Chen24rssWorkshop_DiffusionPaintingTrajectories/Chen24rssWorkshop_DiffusionPaintingTrajectories.pdf"
---

<br />
<br />

#### Abstract

In this work, we seek to generate robot trajectories for artistic painting which exploit the dynamics unique to a robot embodiment. Denoising Diffusion Probabilistic Models (DDPM) have been shown to be effective at generating not only images, but also many other continuous signals including robot trajectories and stroke-based drawing paths. While existing works generating stroke-based art using DDPMs produce computer renderings of drawings, many roboticists and artists have previously identified the value in creating physical artwork with an embodied AI. One notable quality of artwork is the particularities of the medium and tools used. Therefore, we seek to combine artistic stroke generation and dynamics-aware trajectory generation using DDPM to generate strokes that capture both the artistic qualities of the training data and of the robot embodiment. We compare several approaches to extending stroke generation DDPMs to respect robot dynamics, including alternative parameterizations, training on modiﬁed data, classiﬁer guidance, and classiﬁer-free guidance. We qualitatively show that classiﬁer-free guidance most effectively exploits the robot embodiment to generate visually pleasing yet dynamically feasible painting trajectories.
