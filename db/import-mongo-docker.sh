#!/bin/bash

# Variables
CONTAINER_NAME="mongo-container" # Replace with your MongoDB container name
DB_NAME="test" # Name of the database to import into

# Function to import a collection
import_collection() {
    local collection=$1
    local file=$2

    if [ -f "$file" ]; then
        echo "Importing $collection data into $DB_NAME database in container $CONTAINER_NAME..."
        docker exec -i "$CONTAINER_NAME" mongoimport --db "$DB_NAME" --collection "$collection" --file "$file" --jsonArray
        if [ $? -eq 0 ]; then
            echo "Successfully imported $collection data."
        else
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

echo "Data import completed successfully."
