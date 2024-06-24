FROM node:20-alpine3.19
WORKDIR /app
COPY package.json .
RUN npm i -g pnpm && pnpm i --production
COPY . .
ENV PORT 3000
CMD ["node", "index.js"]