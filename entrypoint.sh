#! /bin/bash

if [[ ! -f "./.initialized" ]]; then
  npm install --production

  touch ./.initialized
fi

npm start
