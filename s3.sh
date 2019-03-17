#!/bin/bash

if [[ "$1" != "" ]]; then
    S3BUCKETNAME="$1"
else
    echo ERROR: Failed to supply S3 bucket name
    exit 1
fi

aws s3 dist build s3://$S3BUCKETNAME --acl public-read --cache-control max-age=31536000,public
aws s3 cp s3://$S3BUCKETNAME/index.html s3://$S3BUCKETNAME/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read
