FROM node:20.16.0-alpine AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:webpack


FROM node:20.16.0-alpine

ENV NODE_ENV=production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app

EXPOSE 4000

CMD ["dumb-init", "node", "main.js"]
