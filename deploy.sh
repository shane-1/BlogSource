#!/usr/bin/env sh

set -e

cp googlefc62804cfc44bb36.html docs/.vuepress/dist/
cd docs/.vuepress/dist
git config --global init.defaultBranch master
git config --global user.email "shane-liang@outlook.com"
git config --global user.name "shane-1"
git init
git add *
git commit -m 'version 4.2'
git push -f git@github.com:shane-1/shane-1.github.io.git master
cd ..
cd ..
cd ..
git add *
git commit -m 'version 4.2'
git push git@github.com:shane-1/BlogSource.git master