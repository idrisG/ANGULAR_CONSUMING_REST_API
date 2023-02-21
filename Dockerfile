# Stage 1 compile and build angular codebase

# Use officiale node image as the base image
FROM node:lts-alpine3.17 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json, if no change RUN npm install will not be executed
COPY package.json package-lock.json ./

# Install all dependencies (only of there is a change in package.json and package-lock.json)
RUN npm install --legacy-peer-deps

# Add source code to app
COPY . .

# Generate the build of the application
# ARG config=production ## create var configuration that can be used like : --configuration $config
RUN npm run build

# Use official nginx image as the base image
FROM nginx:stable-alpine

# Set working direcctory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/add-user-app-frontend .

COPY myapp.conf /etc/nginx/default.conf
