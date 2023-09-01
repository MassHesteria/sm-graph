#!/bin/bash

start_seed=1
end_seed=999999
#options="-r esm"
options="--experimental-specifier-resolution=node --no-warnings"
#options="--prof --experimental-specifier-resolution=node --no-warnings"

if [ $# -eq 1 ]; then
   npx tsc
   node $options bin/main.js $1
elif [ $# -eq 2 ]; then
   npx tsc
   node $options bin/main.js $1 $2
else
   npx tsc
   node $options bin/main.js $start_seed $end_seed
   node $options bin/main.js $start_seed $end_seed
fi

