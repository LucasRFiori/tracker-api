import aedes from "aedes";
import net from "net";
import { config } from "../project.config";

const broker = new aedes();
const server = net.createServer(broker.handle);

server.listen(config.MQTT_PORT, () => {
  console.log(`Broker MQTT está ouvindo na porta ${config.MQTT_PORT}`);
});

broker.on("client", (client) => {
  console.log("Novo cliente MQTT conectado:", client.id);
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

  console.log(
    "🚀 ~ file: broker.ts:27 ~ broker.on ~ payloadToSend:",
    payloadToSend
  );
});
