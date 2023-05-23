#!/bin/bash

start_seed=100001
end_seed=101000
options="--experimental-specifier-resolution=node --no-warnings"
node $options src/main.js $start_seed $end_seed

#for i in $(seq 14001 14001); do
   #node --experimental-specifier-resolution=node --no-warnings src/main.js $i
   #if [ $? -ne 0 ]; then
      #echo "seed $i failed"
      #exit 1
   #fi
#done
