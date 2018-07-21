FROM node:8.11.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.jsn AND package-lock.json
# are copied where available (npm@5+)
COPY package*.json ./

RUN npm install 
#If you are building your code for production 
#Run npm install --only=production

#Bundle app source 
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
