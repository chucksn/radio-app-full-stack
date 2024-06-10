FROM node:18.17.1-alpine

WORKDIR /radioapp/api

COPY ./ ./

RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]