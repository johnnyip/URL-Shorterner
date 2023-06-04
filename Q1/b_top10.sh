#!/bin/bash

# decompress the log file, filter by date and count requests per host
gunzip -c test.log.gz | awk -v start="10/Jun/2019:00:00:00 +0800" -v end="19/Jun/2019:23:59:59 +0800" ' 
{ if ($4 > "["start && $4 < "["end) print $1 } ' | sort | uniq -c | sort -nr | head -10

