FROM minio/mc:RELEASE.2025-03-12T17-29-24Z

COPY . /data

RUN chmod +x /data/minio-init.sh

ENTRYPOINT ["/bin/bash", "/data/minio-init.sh"]
