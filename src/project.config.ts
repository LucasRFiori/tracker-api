type QoS = 0 | 1 | 2;

const MQTT_PORT = 1883;

export const config = {
  NODE_PORT: 3000,
  MQTT_PORT,
  MQTT_TOPIC: "coordinates",
  MQTT_CLIENT_ID: "mobile-device",
  MQTT_USERNAME: "admin",
  MQTT_PASSWORD: "admin",
  MQTT_BROKER_URL: `mqtt://localhost:${MQTT_PORT}/`,
  MQTT_QOS: 1 as QoS,
};
