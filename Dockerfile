FROM node:10.16.0-alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./server/dist/ ./

USER node

EXPOSE 8080
CMD [ "node", "server.js"]
