#!/bin/bash

# Variables
MONGO_INITDB_DATABASE="test"

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
        echo "Importing $collection data..."
        if ! mongoimport --db "$MONGO_INITDB_DATABASE" --collection "$collection" --file "$file" --jsonArray; then
            echo "Failed to import $collection data. Exiting..."
            exit 1
        fi
    else
        echo "File $file not found. Skipping..."
    fi
}

# Import data
import_collection "council_en" "/my-data/council_en.json"
import_collection "council_gr" "/my-data/council_gr.json"
import_collection "counselor_en" "/my-data/counselor_en.json"
import_collection "counselor_gr" "/my-data/counselor_gr.json"
import_collection "sg_en" "/my-data/sg_en.json"
import_collection "sg_gr" "/my-data/sg_gr.json"
import_collection "dep_en" "/my-data/dep_en.json"
import_collection "dep_gr" "/my-data/dep_gr.json"
import_collection "news_en" "/my-data/news_en.json"
import_collection "news_gr" "/my-data/news_gr.json"
import_collection "events_en" "/my-data/events_en.json"
import_collection "events_gr" "/my-data/events_gr.json"
import_collection "third_party_en" "/my-data/third_party_en.json"
import_collection "third_party_gr" "/my-data/third_party_gr.json"
import_collection "test_en" "/my-data/test_en.json"
import_collection "test_2" "/my-data/test_2.json"
# Add any new json files here

echo "Data import completed successfully."
