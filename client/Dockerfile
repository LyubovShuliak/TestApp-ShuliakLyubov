FROM node:18.18.0 as base

WORKDIR /app

COPY package*.json /app
COPY tsconfig.json /app

COPY public /app/public


COPY src /app/src

RUN npm install


CMD [ "npm", "run",  "start" ]
EXPOSE 3000
