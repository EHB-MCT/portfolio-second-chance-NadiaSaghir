# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container's /app directory
COPY package*.json .

# Install Node.js dependencies based on the package.json and package-lock.json (if present)
RUN npm install

# Copy all files from the host's current directory (where the Dockerfile is located) to the container's /app directory
COPY ./ ./

# Run the build script defined in my package.json
RUN npm run build

# Define the command to start my application when the container is run
CMD ["npm", "start"]
