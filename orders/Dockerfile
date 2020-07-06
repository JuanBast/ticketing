FROM node:13.12.0-buster

WORKDIR /app

RUN chown -R node:node .

USER node

COPY --chown=node:node package.json* package-lock.json* ./

RUN npm install --only=prod && npm cache clean --force

COPY --chown=node:node . .

CMD ["npm", "start"]