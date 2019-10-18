#!/bin/sh
set -e

rm -rf /var/spool/cron/crontabs && mkdir -p /var/spool/cron/crontabs
cp -f /config/crontab /var/spool/cron/crontabs/root
chmod 0644 /var/spool/cron/crontabs/root

rm -rf /root/.config/rclone && mkdir -p /root/.config/rclone
cp -f /config/rclone.conf /root/.config/rclone/rclone.conf
chmod 0644 /root/.config/rclone/rclone.conf

chmod -R 0644 /var/spool/cron/crontabs
chmod -R 0644 /root/.config/rclone
chmod o+x /config/backup.sh

exec "$@"
