FROM node:18.20.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3002
CMD [ "npm", "run", "dev"]
