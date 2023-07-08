#!/bin/bash

start_seed=1
end_seed=999999
options="--experimental-specifier-resolution=node --no-warnings"
#options="--prof --experimental-specifier-resolution=node --no-warnings"

if [ $# -eq 1 ]; then
   node $options src/main.js $1
elif [ $# -eq 2 ]; then
   node $options src/main.js $1 $2
else
   node $options src/main.js $start_seed $end_seed
fi

