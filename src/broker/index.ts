import aedes from "aedes";
import net from "net";
import { config } from "../project.config";
import axios from "axios";

const broker = new aedes();
const server = net.createServer(broker.handle);

server.listen(config.MQTT_PORT, () => {
  console.log(`🚀 Broker running at ${config.MQTT_PORT}`);
});

broker.on("client", (client) => {
  console.log("📲 New MQTT client connected", client.id);
});

broker.on("publish", (packet, client) => {
  if (!client || !packet.payload) return;

  const messageContent = packet.payload.toString("utf-8");

  const [latitude, longitude] = messageContent.split(",");

  const payloadToSend = {
    clientId: client.id,
    latitude,
    longitude,
  };

  axios
    .post(`${config.NODE_URL}/location-queue`, payloadToSend, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(
        "📩 Package sent to be added to the queue => ",
        response.data
      );
    })
    .catch((error) => {
      console.error("❌ Request error POST:", error.code);
    });
});
