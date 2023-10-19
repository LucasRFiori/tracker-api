import * as mqtt from "mqtt";
import { config } from "../project.config";

const options = {
  clientId: config.MQTT_CLIENT_ID,
  username: config.MQTT_USERNAME,
  password: config.MQTT_PASSWORD,
};

const client = mqtt.connect(config.MQTT_BROKER_URL, options);

function generateRandomCoordinates() {
  const latitude = Math.random() * 180 - 90;
  const longitude = Math.random() * 360 - 180;
  return `${latitude},${longitude}`;
}

function publishCoordinates() {
  const coordinates = generateRandomCoordinates();
  client.publish(
    config.MQTT_TOPIC,
    coordinates,
    { qos: config.MQTT_QOS },
    () => {
      console.log(`📤 Sending: ${coordinates}`);
    }
  );
}

client.on("connect", () => {
  console.log("✅ Connected to the MQTT broker");

  setInterval(publishCoordinates, 3000);
});

client.on("error", (error) => {
  console.error("❌ Connection error:", error);
});

process.on("SIGINT", () => {
  console.log("💤 Disconnecting from the MQTT broker and exiting the client");
  client.end();
  process.exit();
});
