#!/bin/sh
set -e

sleep 5;
mc alias set myminio http://minio:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD &&
mc mb --ignore-existing myminio/files &&
mc cp --recursive /data/files/ myminio/files &&
mc anonymous set-json /data/readonly-policy.json myminio/files;
if [ "$NODE_ENV" = "development" ]; then tail -f /dev/null; else exit 0; fi
