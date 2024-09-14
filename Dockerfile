# Use the official Node.js image.
FROM node:22

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Install nodemon globally.
RUN npm install -g nodemon

# Expose the port the app runs on.
EXPOSE 8080

# Define the command to run your app using nodemon.
CMD ["node", "server.js"]
