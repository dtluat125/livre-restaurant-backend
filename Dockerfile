# Initiate a container to build the application in.
FROM node:14-alpine AS builder
ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy the package.json into the container.
COPY package*.json ./
COPY yarn.lock ./

# Install the dependencies required to build the application.
RUN npm install yarn
RUN yarn install

COPY . .

# Build the application.
RUN npm run build

# Copy the application source into the container.
COPY . .

# # Uninstall the dependencies not required to run the built application.
# RUN npm prune --production

# Debugging step: List contents of the directory to verify if dist folder is present.
RUN ls -l /usr/src/app

# Initiate a new container to run the application in.
FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy everything required to run the built application into the new container.
# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/yarn* ./
# COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/

# Expose the web server's port.
EXPOSE 3000

# Run the application.
CMD ["node", "dist/main"]