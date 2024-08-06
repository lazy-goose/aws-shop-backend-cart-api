FROM node:20.16.0-alpine AS build

RUN apk update && apk add --no-cache dumb-init=1.2.5-r3 ca-certificates=20240705-r0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:webpack


FROM node:20.16.0-alpine

COPY --from=build /usr/sbin/update-ca-certificates /usr/bin/
COPY --from=build /usr/bin/dumb-init /usr/bin/

COPY ./certificates/eu-north-1-bundle.pem /usr/local/share/ca-certificates/eu-north-1-bundle.crt
RUN update-ca-certificates

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app

EXPOSE 4000

ENV NODE_ENV=production
ENV NODE_OPTIONS=--use-openssl-ca

CMD ["dumb-init", "node", "main.js"]
