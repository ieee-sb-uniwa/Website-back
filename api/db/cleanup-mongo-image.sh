#!/bin/bash

# Variables
IMAGE_NAME="website-back-mongo:latest"

# Check for containers using the image
echo "Checking for containers using the image: $IMAGE_NAME..."
CONTAINERS=$(docker ps -a --filter "ancestor=$IMAGE_NAME" -q)

if [ -n "$CONTAINERS" ]; then
    echo "Found containers using the image: $CONTAINERS"
    
    # Stop and remove the containers
    echo "Stopping and removing containers..."
    docker rm -f $CONTAINERS
    if [ $? -eq 0 ]; then
        echo "Containers stopped and removed successfully."
    else
        echo "Failed to stop and remove containers. Exiting..."
        exit 1
    fi
else
    echo "No containers found using the image."
fi

# Remove the image
echo "Removing the image: $IMAGE_NAME..."
docker rmi $IMAGE_NAME
if [ $? -eq 0 ]; then
    echo "Image $IMAGE_NAME removed successfully."
else
    echo "Failed to remove the image $IMAGE_NAME. It might not exist or is in use."
    exit 1
fi

echo "Cleanup completed successfully."
