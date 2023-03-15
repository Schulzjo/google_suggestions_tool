# pull official base image
FROM node:18.14.0-alpine

RUN apk update && apk add bash

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

RUN npm run build

RUN npm install --global serve


