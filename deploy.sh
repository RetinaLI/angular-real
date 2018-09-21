#!/bin/bash
function check_result(){
  if [ "$1" != "0" ]
  then
    echo "出错了，请检查！";
    exit 2;
  fi
}


npm run build;

mv dist/report/*.js dist/report/*.css dist/report/*.png dist/report/assets/;
cp dist/report/index.html dist/report/sell.html;
cp dist/report/index.html dist/report/logistic.html;
cp dist/report/index.html dist/report/serve.html;
cp dist/report/index.html dist/report/product.html;
cp dist/report/index.html dist/report/qe.html;


rm -rf /data/projects/foton/iov-web-api/src/report;
cp -rf dist/* /data/projects/foton/iov-web-api/src/;

cd /data/projects/foton/iov-web-api
git add -A;
git commit -m "update";
git push;
check_result $?;