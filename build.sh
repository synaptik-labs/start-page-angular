#!/bin/sh

npm run dist
docker build -t synaptiklabs/startpage:latest .