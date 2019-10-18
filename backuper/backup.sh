#!/bin/sh

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1>>/var/log/backup.log 2>&1
# Everything below will go to the file 'log.out':

function timestamp() {
    echo `date '+%Y-%m-%d_%H:%M:%S'`;
}

echo "$(timestamp) Creating backup..."

IFS=', ' read -r -a backup_destinations <<< "$BACKUP_DESTINATIONS"

for destination in "${backup_destinations[@]}"
do
    echo "Copying backups from $destination..."
    rclone --auto-confirm -vv copy $destination /backups
    echo "Copied backups from $destination!"
done

7z a -mhe=on -mx3 -p$ARCHIVE_PASSWORD /backups/backup.7z /data/*
archive-rotator -v -n 3 --ext ".7z" /backups/backup.7z

for destination in "${backup_destinations[@]}"
do
    echo "Syncing backups with $destination..."
    rclone --auto-confirm -vv sync /backups $destination --drive-use-trash=false
    echo "Synced backups with $destination!"
done

echo "$(timestamp) Backup created!"
