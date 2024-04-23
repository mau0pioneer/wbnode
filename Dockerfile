FROM node:18.20.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY ./src/app.ts ./src/app.ts

RUN npm install

EXPOSE 3002
CMD [ "npm", "run", "dev"]
