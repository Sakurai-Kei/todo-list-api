# Base image
FROM node:16-alpine as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# COPY next.config.js ./next.config.js
# COPY postcss.config.js ./postcss.config.js
# COPY tailwind.config.js ./tailwind.config.js
# COPY pages ./pages
# COPY public ./public
# COPY styles ./styles

# Bundle app source
COPY . .

# Creates a ".next" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start" ]