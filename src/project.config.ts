type QoS = 0 | 1 | 2;

const MQTT_PORT = 1884;
const NODE_PORT = 3000;
const MONGO_PORT = 27017;
const AMQP_USER = "admin";
const AMQP_PASSWORD = "admin";
const GRPC_PORT = 50051;
const MAIN_URL = "localhost";

export const config = {
  NODE_PORT: 3000,
  NODE_URL: `http://${MAIN_URL}:${NODE_PORT}`,
  MQTT_PORT,
  MQTT_TOPIC: "coordinates",
  MQTT_CLIENT_ID: "0001",
  MQTT_USERNAME: "admin",
  MQTT_PASSWORD: "admin",
  MQTT_BROKER_URL: `mqtt://${MAIN_URL}:${MQTT_PORT}/`,
  MQTT_QOS: 1 as QoS,
  AMQP_QUEUE_NAME: "coordinates-queue",
  AMQP_URL: `amqp://${AMQP_USER}:${AMQP_PASSWORD}@localhost`,
  MONGO_URL: `mongodb://${MAIN_URL}:${MONGO_PORT}/tracker`,
  GRPC_URL: `${MAIN_URL}:${GRPC_PORT}`,
  GRAPHQL_PATH: "/graphql",
};
