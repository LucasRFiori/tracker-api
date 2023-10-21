type QoS = 0 | 1 | 2;

const MQTT_PORT = 1884;
const NODE_PORT = 3000;
const MONGO_PORT = 27017;
const AMQP_USER = "admin";
const AMQP_PASSWORD = "admin";

export const config = {
  NODE_PORT: 3000,
  NODE_URL: `http://localhost:${NODE_PORT}`,
  MQTT_PORT,
  MQTT_TOPIC: "coordinates",
  MQTT_CLIENT_ID: "0001",
  MQTT_USERNAME: "admin",
  MQTT_PASSWORD: "admin",
  MQTT_BROKER_URL: `mqtt://localhost:${MQTT_PORT}/`,
  MQTT_QOS: 1 as QoS,
  AMQP_QUEUE_NAME: "coordinates-queue",
  AMQP_URL: `amqp://${AMQP_USER}:${AMQP_PASSWORD}@localhost`,
  MONGO_URL: `mongodb://localhost:${MONGO_PORT}/tracker`,
};
