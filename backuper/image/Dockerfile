FROM lucashalbert/rclone

RUN apk add --no-cache tzdata

RUN apk add --no-cache p7zip python3

RUN python3 -m pip install archive-rotator

RUN touch /var/log/cron.log && touch /var/log/backup.log && mkdir /backups && mkdir /config

COPY ./cmd.sh /

COPY ./entry.sh /usr/bin/docker-entrypoint.sh

RUN chmod +x /usr/bin/docker-entrypoint.sh

COPY ./backup.sh /

CMD ["/cmd.sh"]
