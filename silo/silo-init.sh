#!/bin/sh
set -e

sleep 5;
SILO_HOST="${SILO_HOST:-silo}"
mc alias set mysilo "http://${SILO_HOST}:9000" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" &&
mc alias set myminio "http://${SILO_HOST}:9000" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" 2>/dev/null || true
mc mb --ignore-existing mysilo/files &&
mc cp --recursive /data/files/ mysilo/files &&
mc anonymous set-json /data/readonly-policy.json mysilo/files;
if [ "$NODE_ENV" = "development" ]; then tail -f /dev/null; else exit 0; fi
