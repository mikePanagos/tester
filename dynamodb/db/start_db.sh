#!/usr/bin/env bash

export DEBUG=dynamodb:*
export AWS_ACCESS_KEY_ID=fakeIf
export AWS_SECRET_ACCESS_KEY=fakeKey
export AWS_REGION=us-east-1
export DYN_ENDPOINT=http://192.168.1.250:8000
export PROD_SYSTEM=false

node db_build.js $1
