#!/bin/sh
set -e

crond -c /var/spool/cron/crontabs -b -L /var/log/cron.log "$@" && tail -f /var/log/cron.log -f /var/log/backup.log