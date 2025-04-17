#!/bin/bash

# Variables
DB_NAME="test"
IMPORT_SCRIPT="$(dirname "$0")/import-mongo-docker.sh"
CONTAINER_NAME="mongo-container" # Replace with your MongoDB container name

# Check if MongoDB container is running
if ! docker ps --format "{{.Names}}" | grep -q "^$CONTAINER_NAME$"; then
    echo "MongoDB container '$CONTAINER_NAME' is not running. Please start it first."
    exit 1
fi

# Clear the database
echo "Clearing the database: $DB_NAME inside the container: $CONTAINER_NAME..."
docker exec -i "$CONTAINER_NAME" mongosh --eval "db.getSiblingDB('$DB_NAME').dropDatabase()" --quiet

if [ $? -eq 0 ]; then
    echo "Database $DB_NAME cleared successfully."
else
    echo "Failed to clear the database $DB_NAME."
    exit 1
fi

# Execute the data import script
if [ -f "$IMPORT_SCRIPT" ]; then
    echo "Running data import script..."
    bash "$IMPORT_SCRIPT"
    if [ $? -eq 0 ]; then
        echo "Data import completed successfully."
    else
        echo "Data import script encountered an error."
        exit 1
    fi
else
    echo "Import script not found at $IMPORT_SCRIPT."
    exit 1
fi
