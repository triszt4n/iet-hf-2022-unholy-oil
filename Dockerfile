FROM node:14
COPY .env .env
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
