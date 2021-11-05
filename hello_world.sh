#!/bin/bash

HELLO_MSG="See http://localhost:9090 to open web gui\nPress Ctrl+C to exit\nTo see log add flag \"--print-log\""
SUCCESS="HelloWorld ended success"
FAILURE="Something went wrong"
CONF="./task1-hello_world/prometheus.yml"
HELLO_WORLD="./task1-hello_world/prometheus --config.file $CONF"

chmod +x ./HelloWorld/prometheus
echo -e $HELLO_MSG

if [ "$1" == "--print-log" ]; then
	$HELLO_WORLD
else
	$HELLO_WORLD &> /dev/null
fi

if [ $? -eq 0 ]; then
	printf "\n$SUCCESS\n"
else
	printf "\n$FAILURE\n"
fi
