FROM node:14
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD npm run start:prod
