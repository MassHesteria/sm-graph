#!/bin/bash

for i in $(seq 10001 14000); do
   node --experimental-specifier-resolution=node --no-warnings src/main.js $i
   if [ $? -ne 0 ]; then
      echo "seed $i failed"
      exit 1
   fi
done
