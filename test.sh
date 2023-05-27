#!/bin/bash

start_seed=461800
start_seed=1
end_seed=999999
end_seed=1000
options="--experimental-specifier-resolution=node --no-warnings"
#options="--prof --experimental-specifier-resolution=node --no-warnings"

if [ $# -eq 1 ]; then
   node $options src/main.js $1
else
   node $options src/main.js $start_seed $end_seed
fi

