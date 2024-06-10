FROM node:18.18.0 as base

WORKDIR /app


RUN npm install -g @nestjs/cli
COPY package*.json /app
COPY tsconfig.json /app
COPY tsconfig.build.json /app


COPY src /app
COPY nest-cli.json /app

RUN npm install
RUN npm run build


CMD [ "node", "dist/main.js"]
EXPOSE 8080
