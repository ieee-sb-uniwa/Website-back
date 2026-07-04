#!/bin/bash

echo "Stopping and removing development containers..."
docker compose -f docker-compose.yml down
