FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# Indicate that the app is running in a container (browser will not automatically open)
ENV RUNNING_IN_DOCKER=true

EXPOSE 3000

CMD ["npm", "serve"]
