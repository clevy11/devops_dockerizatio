# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Create .env from example
COPY .env.example .env

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]