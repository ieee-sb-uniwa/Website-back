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
        echo "Importing $collection data to "$MONGO_INITDB_DATABASE"..."
        if ! mongoimport --username "$MONGO_INITDB_ROOT_USERNAME" \
            --password "$MONGO_INITDB_ROOT_PASSWORD" \
            --authenticationDatabase admin \
            --db "$MONGO_INITDB_DATABASE" \
            --collection "$collection" \
            --file "$file" \
            --jsonArray; then
            echo "Failed to import $collection data. Exiting..."
            exit 1
        fi
    else
        echo "File $file not found. Skipping..."
    fi
}

# Import data
import_collection "council" "/docker-entrypoint-initdb.d/data/council.json"
import_collection "counselor" "/docker-entrypoint-initdb.d/data/counselor.json"
import_collection "events" "/docker-entrypoint-initdb.d/data/events.json"
import_collection "thirdparty" "/docker-entrypoint-initdb.d/data/thirdparty.json"
import_collection "people" "/docker-entrypoint-initdb.d/data/people.json"
import_collection "scientific_groups" "/docker-entrypoint-initdb.d/data/scientific_groups.json"
import_collection "projects" "/docker-entrypoint-initdb.d/data/projects.json"

# Add any new json files here

 echo "Data import completed successfully."
