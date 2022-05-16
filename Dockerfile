FROM node:14

WORKDIR /src

COPY .env .
COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
CMD npm run start:prod
