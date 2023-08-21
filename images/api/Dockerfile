# Use the latest Node.js image as the base
FROM node:latest

# Set the working directory within the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY ./ ./

# Define the command to start the application when the container runs
CMD ["npm", "start"]