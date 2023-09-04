#!/bin/bash

options="--experimental-specifier-resolution=node --no-warnings"
npx tsc
node $options bin/markdown.js