FROM node:10-alpine

EXPOSE 3001

WORKDIR /app

COPY package.json package-lock.json* ./ 

RUN npm install && npm cache clean --force

COPY . .

CMD [ "node", "./src/server.js" ]