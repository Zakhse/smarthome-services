ARG VERSION=latest
FROM koenkk/zigbee2mqtt:$VERSION

COPY ./apply-creds.sh /app
RUN chmod +x /app/apply-creds.sh

CMD /app/apply-creds.sh && npm start
