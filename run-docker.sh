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

docker volume create minio-data
docker volume create web-mongo-data
echo "Created external volumes"

# docker compose -f docker-compose.yml build --no-cache mongo

docker compose -f docker-compose.yml build --no-cache

# Check the value of NODE_ENV
if [ "$NODE_ENV" = "development" ]; then
    echo "Running in development mode..."
    docker compose -f docker-compose.yml watch
elif [ "$NODE_ENV" = "production" ]; then
    echo "Running in production mode..."
    docker compose -f docker-compose.yml up -d
else
    echo "NODE_ENV is not set or has an invalid value. Use 'development' or 'production'."
    exit 1
fi
