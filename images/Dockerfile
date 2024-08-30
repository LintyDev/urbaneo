FROM node:lts-alpine

RUN mkdir /images
WORKDIR /images
COPY package.json ./
RUN npm i
RUN apk --update --no-cache add curl
COPY src src
COPY tsconfig.json ./
RUN mkdir ./img
COPY img/default.png ./img

CMD npm run start