FROM node:lts-alpine

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json ./
RUN npm install -g npm@10.8.2
RUN npm i

RUN apk --update --no-cache add curl

COPY src src
COPY public public

COPY codegen.ts ./
COPY tsconfig.json ./
COPY next.config.mjs ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

CMD npm run dev