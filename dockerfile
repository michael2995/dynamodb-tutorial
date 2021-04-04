FROM node:12-alpine
RUN apk add --no-cache g++ make python

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn tsc

CMD ["node", ".build/local.js"]