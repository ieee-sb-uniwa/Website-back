# Use official MongoDB image from Docker Hub
FROM mongo:latest

# Add your JSON files to be loaded into MongoDB
COPY ./data /docker-entrypoint-initdb.d/data

# Add initialization scripts
COPY ./init-mongo.sh /docker-entrypoint-initdb.d/

# Clear and crlf from windows
RUN sed -i 's/\r$//' /docker-entrypoint-initdb.d/init-mongo.sh

RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh

# Expose MongoDB port
EXPOSE 27017
