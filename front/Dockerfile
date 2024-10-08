# Construction of the Docker image
FROM node:18 as build

# Define the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Server nginx configuration
FROM nginx:alpine

# Copy the build files to the nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port 80
EXPOSE 80

# Command to start the server
CMD ["nginx", "-g", "daemon off;"]