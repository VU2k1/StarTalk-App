ARG NODE_VERSION=19-alpine3.16
FROM node:${NODE_VERSION}

# Set working directory
WORKDIR /usr/src/app/pages
COPY package*.json ./
RUN npm install
COPY . .

RUN npm install express body-parser
EXPOSE 8080
CMD ["node", "server.js"]
