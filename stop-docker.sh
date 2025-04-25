#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
else
    echo ".env file not found!"
    exit 1
fi

# Check the value of NODE_ENV
if [ "$NODE_ENV" == "development" ]; then
    echo "Stopping and removing development containers..."
    docker compose -f docker-compose.yml down
elif [ "$NODE_ENV" == "production" ]; then
    echo "Stopping and removing production containers..."
    docker compose -f docker-compose.yml down
else
    echo "NODE_ENV is not set or has an invalid value. Use 'development' or 'production'."
    exit 1
fi
