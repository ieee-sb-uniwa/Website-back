FROM minio/mc:RELEASE.2025-03-12T17-29-24Z

WORKDIR /my-minio

COPY . .

RUN chmod +x /my-minio/minio-init.sh

ENTRYPOINT ["/my-minio/minio-init.sh"]
