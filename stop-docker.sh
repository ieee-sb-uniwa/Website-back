#!/bin/bash

echo "Stopping and removing development containers..."
docker compose -f docker-compose.yml down
docker volume rm minio-data web-mongo-data
docker volume rm web-mongo-data
echo "Removed external volumes"
