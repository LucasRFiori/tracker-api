import * as mqtt from "mqtt";
import { config } from "../project.config";

const mqttClientId = process.argv[2];

console.log(config.MQTT_CLIENT_ID);
if (!mqttClientId && !config.MQTT_CLIENT_ID) {
  console.error("❌ MQTT_CLIENT_ID was not provided.");
  process.exit(1);
}

const options = {
  clientId: mqttClientId ?? config.MQTT_CLIENT_ID,
  username: config.MQTT_USERNAME,
  password: config.MQTT_PASSWORD,
};

const client = mqtt.connect(config.MQTT_BROKER_URL, options);

function generateRandomCoordinates() {
  const minLatitude = -90;
  const maxLatitude = 90;
  const minLongitude = -180;
  const maxLongitude = 180;

  const latitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
  const longitude =
    Math.random() * (maxLongitude - minLongitude) + minLongitude;

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
