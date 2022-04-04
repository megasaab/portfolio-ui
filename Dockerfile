FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3200

CMD ["npm", "run start"]