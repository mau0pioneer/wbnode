FROM node:18.20.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY ./src/app.ts ./src/app.ts

RUN npm install
RUN --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("file%3A///usr/src/app/node_modules/tsm/loader.mjs", pathToFileURL("./"));'

EXPOSE 3002
CMD [ "npm", "run", "dev"]
