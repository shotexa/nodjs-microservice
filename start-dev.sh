#!/bin/sh
cd companies.microservice
npm install
cd ../
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up