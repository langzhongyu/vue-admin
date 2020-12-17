#拉取代码
git pull

yarn --registry=https://registry.npm.taobao.org/ && yarn build

#删除容器
docker rm -f vue-project &> /dev/null

#启动容器
docker run -d --restart=on-failure:5\
    -p 8081:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name vue-project nginx
