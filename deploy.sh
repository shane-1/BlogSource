#!/usr/bin/env sh

set -e

npm run build

cd docs/.vuepress/dist
#首次初始化代码
#git init
git config user.name "shane-1"
git config user.email "qq1217232433@outlook.com"
git add -A
git commit -m 'update image system'
git push -f git@github.com:shane-1/shane-1.github.io.git master