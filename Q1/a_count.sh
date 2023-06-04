#!/bin/bash

# unzip and pipe into wc, with option l
gzip -dc test.log.gz | wc -l
