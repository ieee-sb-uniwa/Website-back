#!/bin/bash

echo "Waiting for MongoDB to be ready..."
mongosh --eval "print('MongoDB is ready.')" --quiet

# Council
echo "Importing council data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection council_en --file /data/council_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection council_gr --file /data/council_gr.json --jsonArray

# Counselor
echo "Importing counselor data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection counselor_en --file /data/counselor_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection counselor_gr --file /data/counselor_gr.json --jsonArray

# Scientific Groups
echo "Importing sg data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection sg_en --file /data/sg_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection sg_gr --file /data/sg_gr.json --jsonArray

# Departments
echo "Importing dep data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection dep_en --file /data/dep_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection dep_gr --file /data/dep_gr.json --jsonArray

# News
echo "Importing news data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection news_en --file /data/news_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection news_gr --file /data/news_gr.json --jsonArray

# Events
echo "Importing events data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection events_en --file /data/events_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection events_gr --file /data/events_gr.json --jsonArray

# Third-party Events
echo "Importing third_party data..."
mongoimport --db "$MONGO_INITDB_DATABASE" --collection third_party_en --file /data/third_party_en.json --jsonArray
mongoimport --db "$MONGO_INITDB_DATABASE" --collection third_part_gr --file /data/third_party_gr.json --jsonArray

echo "Data import completed."
