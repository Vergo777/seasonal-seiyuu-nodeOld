#!/bin/bash

npm install

cp -r ../seasonal-seiyuu-ui/build ./public

nohup npm start &
