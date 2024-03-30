ARG NODE_VERSION=19-alpine3.16
FROM node:${NODE_VERSION}

# Set working directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]