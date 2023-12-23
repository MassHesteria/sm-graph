#!/bin/bash

start_seed=1
end_seed=999999
#options="-r esm"
options="--experimental-specifier-resolution=node --no-warnings"
#options="--prof --experimental-specifier-resolution=node --no-warnings"
#cmd="clinic heapprofiler -- node $options"
#cmd="clinic flame -- node $options"
cmd="node $options"

if [ $# -eq 1 ]; then
   npx tsc
   $cmd bin/main.js $1
elif [ $# -eq 2 ]; then
   npx tsc
   $cmd bin/main.js $1 $2
else
   npx tsc
   $cmd bin/main.js $start_seed $end_seed
   $cmd bin/main.js $start_seed $end_seed
fi

