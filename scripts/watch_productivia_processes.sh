#!/bin/bash

# Watch loop
while true; do

  WEBSITE_SERVER_OUTPUT=$(ss -tulpn | grep :3000 | wc -l)

  if [ "${WEBSITE_SERVER_OUTPUT}" = "0" ] ; then

    cd /opt/productivia/server
    . ./scripts/production.sh

    nohup npm run start -- --port 3000 &
    # sleep 5  # wait for server to start, or the next command to start graphql fails
    # nohup curl -s http://localhost:3000/api/graphql >/dev/null &

  fi

  # Wait before retesting
  sleep 7

done

