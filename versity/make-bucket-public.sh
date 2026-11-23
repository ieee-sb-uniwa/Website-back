#!/bin/sh

set -eu

: "${AWS_ACCESS_KEY_ID:?AWS_ACCESS_KEY_ID is required}"
: "${AWS_SECRET_ACCESS_KEY:?AWS_SECRET_ACCESS_KEY is required}"
: "${S3_ENDPOINT:?S3_ENDPOINT is required}"
: "${S3_BUCKET:?S3_BUCKET is required}"

AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION

echo "======================================"
echo " VersityGW Public Access Configuration"
echo "======================================"

echo "Endpoint: $S3_ENDPOINT"
echo "Bucket:   $S3_BUCKET"

echo "Waiting for VersityGW..."

attempts=0
max_attempts=60

until aws --endpoint-url "$S3_ENDPOINT" \
    s3api head-bucket \
    --bucket "$S3_BUCKET" >/dev/null 2>&1; do

    attempts=$((attempts + 1))

    if [ "$attempts" -ge "$max_attempts" ]; then
        echo "ERROR: VersityGW bucket is unavailable."
        exit 1
    fi

    sleep 2
done

echo "Bucket is accessible."

echo "Configuring public-read access..."

aws --endpoint-url "$S3_ENDPOINT" \
    s3api put-bucket-acl \
    --bucket "$S3_BUCKET" \
    --acl public-read

echo "Verifying bucket ACL..."

aws --endpoint-url "$S3_ENDPOINT" \
    s3api get-bucket-acl \
    --bucket "$S3_BUCKET"

echo "======================================"
echo " Public access configured successfully"
echo "======================================"