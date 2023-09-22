---
title: "Equality Constrained Linear Optimal Control With Factor Graphs"
author: "Shuo Yang, <u>Gerry Chen</u>, Yetong Zhang, Howie Choset, and Frank Dellaert"
journal: "IEEE International Conference on Robotics and Automation (ICRA)"
year: "2021"
date: Nov 2, 2020
# pages: "7173-7180"
arxiv: "https://arxiv.org/abs/2011.01360"
PDF: "Yang21pre_ecLQR/Yang20pre_equalityconstrainedLQR.pdf"
DOI: "https://doi.org/10.1109/ICRA48506.2021.9562000"
img: "icon.png"
category: "proceedings"
---

<br />

#### Abstract

This paper presents a novel factor graph-based approach to solve the discrete-time finite-horizon Linear Quadratic Regulator problem subject to auxiliary linear equality constraints within and across time steps. We represent such optimal control problems using constrained factor graphs and optimize the factor graphs to obtain the optimal trajectory and the feedback control policies using the variable elimination algorithm with a modified Gram-Schmidt process. We prove that our approach has the same order of computational complexity as the state-of-the-art dynamic programming approach. Furthermore, current dynamic programming approaches can only handle equality constraints between variables at the same time step, but ours can handle equality constraints among any combination of variables at any time step while maintaining linear complexity with respect to trajectory length. Our approach can be used to efficiently generate trajectories and feedback control policies to achieve periodic motion or repetitive manipulation.
