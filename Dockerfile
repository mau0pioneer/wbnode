FROM node:18.20.1

# update npm
RUN npm install -g npm@latest

RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

EXPOSE 3002
CMD [ "npm", "run", "dev"]
