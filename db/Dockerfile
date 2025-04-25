# Use official MongoDB image from Docker Hub
FROM mongo:8.0.3

# Add your JSON files to be loaded into MongoDB
COPY ./data /my-data

# Add initialization scripts
COPY ./init-mongo.sh /docker-entrypoint-initdb.d/

# Clear and crlf from windows
RUN sed -i 's/\r$//' /docker-entrypoint-initdb.d/init-mongo.sh

# Expose MongoDB port
EXPOSE 27017
