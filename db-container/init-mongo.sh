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
        echo "Importing $collection data..."
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
# import_collection "sg_en" "/my-data/sg_en.json"
# import_collection "sg_gr" "/my-data/sg_gr.json"
# import_collection "dep_en" "/my-data/dep_en.json"
# import_collection "dep_gr" "/my-data/dep_gr.json"
# import_collection "news_en" "/my-data/news_en.json"
# import_collection "news_gr" "/my-data/news_gr.json"
import_collection "events" "/data/events.json"
import_collection "third_party" "/data/thirdparty.json"
# import_collection "third_party" "/my-data/third_party.json"
# import_collection "test_en" "/my-data/test_en.json"
# import_collection "test_2" "/my-data/test_2.json"
# Add any new json files here

echo "Data import completed successfully."
