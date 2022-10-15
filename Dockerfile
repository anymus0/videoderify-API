FROM node:current-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm run docker-prod
CMD [ "node", "dist/index.js" ]