#!/usr/bin/env bash

if [[ "$NOFRONT" = "true" ]]
then
  ts-node ./server/server.js  
else
  echo "starting frontend and bff"
  npx concurrently "ts-node ./server/server.js" "next start"
fi