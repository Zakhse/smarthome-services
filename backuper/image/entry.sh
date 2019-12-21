#!/bin/sh
set -e

rm -rf /var/spool/cron/crontabs && mkdir -p /var/spool/cron/crontabs
echo -e "${CRON_EXPRESSION} /backup.sh\n" > /var/spool/cron/crontabs/root

rm -rf /root/.config/rclone && mkdir -p /root/.config/rclone
cp -f /config/rclone.conf /root/.config/rclone/rclone.conf

chmod -R 0644 /var/spool/cron/crontabs
chmod -R 0644 /root/.config/rclone

exec "$@"
