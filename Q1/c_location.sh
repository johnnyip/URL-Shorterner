#!/bin/bash

# decompress the log file, extract IPs, perform geolocation, count results per country, and print the top 1
gunzip -c test.log.gz | awk '{ print $1 }' | sort | uniq | while read IP; do geoiplookup $IP; done | cut -d: -f2 | sort | uniq -c | sort -nr | head -1

