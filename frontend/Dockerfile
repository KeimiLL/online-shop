FROM node:22.2-alpine AS node

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 4200
CMD ["yarn", "run", "start", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check", "--poll", "1000"]