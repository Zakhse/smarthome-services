#!/bin/sh

echo -e "user: ${MQTT_USER}\npassword: ${MQTT_PASSWORD}\nnetwork_key: ${NETWORK_KEY}\n" > /app/data/creds.yaml

if [ -f "/app/data/configuration.yaml" ];
then
  case "$MQTT_SECURE" in
    true|1) MQTT_PROTOCOL=mqtts ;;
    *) MQTT_PROTOCOL=mqtt ;;
  esac
  MQTT_FULL_SERVER=${MQTT_PROTOCOL}://${MQTT_SERVER}:${MQTT_PORT}
  sed -i "s|\(&mqtt_server\) .*|\1 $MQTT_FULL_SERVER|" /app/data/configuration.yaml
fi
