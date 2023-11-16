FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
RUN npm update @ck-tickets/common
COPY . .

CMD ["npm", "start"]
