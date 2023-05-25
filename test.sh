#!/bin/bash

start_seed=1
end_seed=10
options="--experimental-specifier-resolution=node --no-warnings"
node $options src/main.js $start_seed $end_seed
