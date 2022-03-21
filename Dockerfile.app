FROM node as base

#  Keep node dependencies seperate so app can be mounted without overwriting them
WORKDIR /dependencies
COPY package*.json /
ENV NODE_PATH=/dependencies/node_modules
EXPOSE 3000

# Create production image
FROM base as production
ENV NODE_ENV=production
RUN npm install
WORKDIR /app
CMD ["node", "bin/www"]

# Create dev image
FROM base as dev
ENV NODE_ENV=development
WORKDIR /app
RUN npm install -g nodemon && npm install
CMD ["nodemon", "bin/www"]
