#!/bin/bash

# Variables
# MONGO_INITDB_DATABASE="sb-data"

echo "Waiting for MongoDB to be ready..."
until mongosh --eval "db.runCommand({ ping: 1 })" --quiet; do
    echo "MongoDB is not ready yet. Retrying..."
    sleep 2
done
echo "MongoDB is ready."

# Function to import a collection
import_collection() {
    local collection=$1
    local file=$2

    if [ -f "$file" ]; then
        echo "Importing $collection data to "$MONGO_DB_NAME"..."
        if ! mongoimport --db "$MONGO_DB_NAME" --collection "$collection" --file "$file" --jsonArray; then
            echo "Failed to import $collection data. Exiting..."
            exit 1
        fi
    else
        echo "File $file not found. Skipping..."
    fi
}

# Import data
import_collection "council" "/data/council.json"
import_collection "counselor" "/data/counselor.json"
import_collection "events" "/data/events.json"
import_collection "third_party" "/data/thirdparty.json"
# Add any new json files here

echo "Data import completed successfully."
