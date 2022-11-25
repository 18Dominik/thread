FROM node:latest
ENV NODE_ENV=production

# Create app directory
WORKDIR /thread

# Install app dependencies
COPY . .
#COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

# Bundle app source
#COPY . .

CMD [ "node", "app.js" ]