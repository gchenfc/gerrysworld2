#!/bin/bash

cp output/resume.pdf GerryChen_resume.pdf
cp output/resume.pdf ../GerryChen_resume.pdf
cp -r ../resume/* ~/GIT_REPOS/gerrysworld2/resume/
convert ~/GIT_REPOS/gerrysworld2/resume/GerryChen_resume.pdf[0] ~/GIT_REPOS/gerrysworld2/resume/CV.png
