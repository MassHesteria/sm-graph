#!/bin/bash

for i in $(seq 1 100); do
   node --experimental-specifier-resolution=node --no-warnings src/main.js
   if [ $? -ne 0 ]; then
      exit 1
   fi
done
