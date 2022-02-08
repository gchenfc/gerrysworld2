#!/bin/bash

cp output/CV.pdf GerryChen_CV.pdf
cp output/CV.pdf ../GerryChen_CV.pdf
cp -r ../CV/* ~/GIT_REPOS/gerrysworld2/CV/
convert ~/GIT_REPOS/gerrysworld2/CV/GerryChen_CV.pdf[0] ~/GIT_REPOS/gerrysworld2/CV/CV.png
