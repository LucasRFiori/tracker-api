import aedes from "aedes";
import net from "net";
import { config } from "../project.config";
import AmqpProducer from "./AmqpProducer";

const broker = new aedes();
const server = net.createServer(broker.handle);

server.listen(config.MQTT_PORT, () => {
  console.log(`🚀 Broker running at ${config.MQTT_PORT}`);
});

broker.on("client", (client) => {
  console.log("📲 New MQTT client connected", client.id);
});

broker.on("publish", async (packet, client) => {
  if (!client || !packet.payload) return;

  const messageContent = packet.payload.toString("utf-8");

  const [latitude, longitude] = messageContent.split(",");

  const payloadToSend = {
    deviceCode: client.id,
    latitude,
    longitude,
  };

  try {
    const data = await AmqpProducer.sendDataToQueue(payloadToSend);
    console.log("Recived from AMQP =>", data);
  } catch (e) {
    console.log("Error", e);
  }
});
