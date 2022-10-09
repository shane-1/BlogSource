#!/usr/bin/env sh

set -e

cd docs/.vuepress/dist
git init
cp googlefc62804cfc44bb36.html docs/.vuepress/dist/
git add *
git commit -m 'version 4.1'
git push -f git@github.com:shane-1/shane-1.github.io.git master
cd ..
cd ..
cd ..
git add *
git commit -m 'version 4.1'
git push git@github.com:shane-1/edit.git master
git push git@github.com:shane-1/BlogSource.git master
