---
title: "Generalizing Trajectory Retiming to Quadratic Objective Functions"
author: "<u>Gerry Chen</u>, Frank Dellaert, and Seth Hutchinson"
journal: "2024 IEEE International Conference on Robotics and Automation (ICRA)"
year: "2024"
date: May. 2, 2024
PDF: "Chen24icra_qopp/Chen24icra_qopp.pdf"
img: "topp_vs_qopp.svg"
category: "proceedings"
arxiv: "https://arxiv.org/abs/2309.10176"
# Video: "https://youtu.be/MSK--soXtRY"
Poster: "Chen24icra_qopp/poster.pdf"
links:
  "Code": "https://github.com/gchenfc/gtsam/tree/features/gerry/trajectory_retiming/gtsam_unstable/retiming"
  "Video": "https://youtu.be/GHjU3fGdKwI"
  "Video (Abbreviated)": "https://youtu.be/MSK--soXtRY"
---

<br />
<br />

#### Abstract

Trajectory retiming is the task of computing a feasible time parameterization to traverse a path. It is commonly used in the decoupled approach to trajectory optimization whereby a path is first found, then a retiming algorithm computes a speed profile that satisfies kino-dynamic and other constraints. While trajectory retiming is most often formulated with the minimum-time objective (i.e. traverse the path as fast as possible), it is not always the most desirable objective, particularly when we seek to balance multiple objectives or when bang-bang control is unsuitable. In this paper, we present a novel algorithm based on factor graph variable elimination that can solve for the global optimum of the retiming problem with *quadratic* objectives as well (e.g. minimize control effort or match a nominal speed by minimizing squared error), which may extend to arbitrary objectives with iteration. Our work extends prior works, which find only solutions on the boundary of the feasible region, while maintaining the same linear time complexity from a single forward-backward pass. We experimentally demonstrate that (1) we achieve better real-world robot performance by using quadratic objectives in place of the minimum-time objective, and (2) our implementation is comparable or faster than state-of-the-art retiming algorithms.

<br />

##### Factor Graph Elimination Animation for Solving QP w/ Inequality Constraints
<!-- Embed eliminationGif/index.html -->
<iframe src="./eliminationGif/index.html" width="100%" style="border:none; aspect-ratio: 16/9;"></iframe>
