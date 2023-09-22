---
title: "Locally Optimal Estimation and Control of Cable Driven Parallel Robots using Time Varying Linear Quadratic Gaussian Control"
author: "<u>Gerry Chen</u>, Seth Hutchinson, Frank Dellaert"
journal: "2022 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)"
year: "2022"
date: Oct. 21, 2022
PDF: "Chen22iros_cdpr_control/Chen22iros_cdpr_tracking_control.pdf"
img: "iros_exp1_errors.svg"
Video: "https://youtu.be/mpHqBXztF40"
category: "proceedings"
arxiv: "https://arxiv.org/abs/2208.00916"
DOI: "https://doi.org/10.1109/IROS47612.2022.9981144"
---

<br />

#### Abstract
We present a locally optimal tracking controller for Cable Driven Parallel Robot (CDPR) control based on a time-varying Linear Quadratic Gaussian (TV-LQG) controller. In contrast to many methods which use fixed feedback gains, our time-varying controller computes the optimal gains depending on the location in the workspace and the future trajectory. Meanwhile, we rely heavily on offline computation to reduce the burden of online implementation and feasibility checking. Following the growing popularity of probabilistic graphical models for optimal control, we use factor graphs as a tool to formulate our controller for their efficiency, intuitiveness, and modularity. The topology of a factor graph encodes the relevant structural properties of equations in a way that facilitates insight and efficient computation using sparse linear algebra solvers. We first use factor graph optimization to compute a nominal trajectory, then linearize the graph and apply variable elimination to compute the locally optimal, time varying linear feedback gains. Next, we leverage the factor graph formulation to compute the locally optimal, time-varying Kalman Filter gains, and finally combine the locally optimal linear control and estimation laws to form a TV-LQG controller. We compare the tracking accuracy of our TV-LQG controller to a state-of-the-art dual-space feed-forward controller on a 2.9m x 2.3m, 4-cable planar robot and demonstrate improved tracking accuracies of 0.8° and 11.6mm root mean square error in rotation and translation respectively.
