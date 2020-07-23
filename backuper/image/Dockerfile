FROM lucashalbert/rclone

RUN apk add --no-cache tzdata

RUN apk add --no-cache p7zip python3 py3-pip

RUN python3 -m pip install archive-rotator

RUN touch /var/log/cron.log && touch /var/log/backup.log && mkdir /backups && mkdir /config

COPY ./cmd.sh ./backup.sh /

COPY ./entry.sh /usr/bin/docker-entrypoint.sh

RUN chmod +x /usr/bin/docker-entrypoint.sh /backup.sh /cmd.sh

CMD ["/cmd.sh"]
