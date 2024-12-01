FROM node:18-alpine AS base

WORKDIR /app

COPY . .

RUN npm install & npm install -g typescript@5.4.5 ts-node

COPY node_modules .  

EXPOSE 8082 

CMD ["ts-node", "src/server.ts"]