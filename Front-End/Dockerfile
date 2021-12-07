FROM node:10
WORKDIR /usr
COPY package*.json ./
RUN npm install --global gulp-cli
RUN npm install
COPY . .
EXPOSE 8000
CMD ["gulp", "start:frontend"]
