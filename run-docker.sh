#!/bin/bash

set -e

if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport
else
    echo ".env file not found!"
    exit 1
fi

NODE_ENV=$(echo "$NODE_ENV" | tr -d '\r' | xargs)

#git submodule update --remote --merge --init

echo "Using named volumes from compose"

# docker compose -f docker-compose.yml build --no-cache mongo

if [ "$NODE_ENV" = "development" ]; then
    docker compose build
else
    docker compose -f docker-compose.yml build
fi

# Check the value of NODE_ENV
if [ "$NODE_ENV" = "development" ]; then
    echo "Running in development mode..."
    docker compose watch
elif [ "$NODE_ENV" = "production" ]; then
    echo "Running in production mode..."
    docker compose -f docker-compose.yml up -d
else
    echo "NODE_ENV is not set or has an invalid value. Use 'development' or 'production'."
    exit 1
fi
