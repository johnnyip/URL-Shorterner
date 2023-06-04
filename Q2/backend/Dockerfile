# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the Docker image
COPY package*.json ./

# Install the application dependencies inside the Docker image
RUN npm install

# Bundle application source inside Docker image
COPY . .

# Run tests
RUN npm test

# If tests are successful, build the production version
RUN npm run build

# Expose port 3000 for the application.
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "server.js" ]
