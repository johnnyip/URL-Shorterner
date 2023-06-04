## Q1. Log Analytics

Environment: AWS EC2 t2.micro, Ubuntu linux

Names of the shell script file:
`a_count.sh`, `b_top10.sh`, `c_location.sh`

### a. Count the total number of HTTP requests recorded in this log file
Output:
```
   86086
```

### b. Find the Top 10 hosts that made the most HTTP requests from 2019-06-10 00:00:00 up to and including 2019-06-19 23:59:59
Output:
```
 730 118.24.71.239
 730 1.222.44.52
 723 119.29.129.76
 486 148.251.244.137
 440 95.216.38.186
 440 136.243.70.151
 437 5.189.159.208
 437 213.239.216.194
 436 5.9.71.213
 406 5.9.108.254
```

### c. Find the country that made the most HTTP requests
First, install `geoip-bin` package to get the geolocation from a ip-address. Then execute the scripts.
Output:
```
   2212  US, United States
```


## Q2. System Design and Implementation