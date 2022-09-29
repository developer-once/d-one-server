FROM node:14.18.1
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app

COPY . /app
# RUN npm install --registry=https://registry.npm.taobao.org

# RUN npm install --save-dev sequelize-cli
# RUN npm run tsc

EXPOSE 6001

CMD NODE_ENV=development npx sequelize db:migrate && npm run start