set -e

npm run build

cd docs/.vuepress/dist
git init
cp C:/Users/qq121/Desktop/doc/Git/Blog/googlefc62804cfc44bb36.html C:/Users/qq121/Desktop/doc/Git/Blog/docs/.vuepress/dist/
git add *
git commit -m 'version 2.0'
git push -f git@github.com:shane-1/shane-1.github.io.git master
cd C:/Users/qq121/Desktop/doc/Git/Blog
git add *
git commit -m 'version 2.0'
git push git@github.com:shane-1/edit.git master
git push git@github.com:shane-1/BlogSource.git master