# Use the Bun official image
FROM oven/bun:latest

# Install curl
RUN apt-get update && apt-get install -y curl

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb files to install dependencies first
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the application port (adjust based on your app's port)
EXPOSE 3000

# Command to start the application
CMD ["bun", "run", "start"]
