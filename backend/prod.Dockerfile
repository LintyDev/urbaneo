FROM node:lts-alpine

RUN mkdir /backend
WORKDIR /backend
COPY package.json ./

RUN npm i
RUN apk --update --no-cache add curl

COPY src src
COPY tsconfig.json ./
COPY .env ./

RUN npm run build
CMD npm run prod
