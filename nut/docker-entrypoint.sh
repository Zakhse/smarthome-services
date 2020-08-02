#!/bin/sh

/usr/local/ups/sbin/upsdrvctl -u root start
exec /usr/local/ups/sbin/upsd -u root -D
