#!/bin/bash

mv index.md index_bak.md
cp -r ~/GIT_REPOS/DenseMapping/docs/ .
mv index_bak.md index.md
mv index.html main.html