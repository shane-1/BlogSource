#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist
git init
git config user.name "shane-1"
git config user.email "qq1217232433@outlook.com"
git add *
git commit -m 'version 2.0'
git push -f git@github.com:shane-1/shane-1.github.io.git master
cd C:/Users/qq121/Desktop/doc/Git/Blog
git init
git add *
git commit -m 'version 2.0'
git push -f git@github.com:shane-1/edit.git master
git push -f git@github.com:shane-1/BlogSource.git master