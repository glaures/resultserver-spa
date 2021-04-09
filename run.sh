#!/bin/bash
git pull
docker build -t sandkastenliga/resultserver-spa .
docker stop sandkastenliga-resultserver-spa
docker rm sandkastenliga-resultserver-spa
docker run --name sandkastenliga-resultserver-spa --net sklnet -p 8083:80 --restart always -d sandkastenliga/resultserver-spa