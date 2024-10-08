#!/bin/bash
# Wait for MongoDB to start
sleep 10

mongoimport --host localhost --db mydatabase --collection universities --type csv --headerline --file /data/mydata.csv

echo "Data import completed."