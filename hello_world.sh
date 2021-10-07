#!/bin/bash

HELLO_MSG="See http://localhost:9090 to open web gui\nPress Ctrl+C to exit\nTo see log add flag \"--print-log\""
SUCCESS="HelloWorld ended success"
FAILURE="Something went wrong"
CONF="./HelloWorld/prometheus.yml"
HELLO_WORLD="./HelloWorld/prometheus --config.file $CONF"
NODE_EXPORTER="./HelloWorld/node_exporter/node_exporter --web.listen-address 127.0.0.1"

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
