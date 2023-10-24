import amqp from "amqplib";
import { config } from "../../project.config";
import axios from "axios";

interface MessageContent {
  clientId: string;
  latitude: string;
  longitude: string;
}
class RabbitMQMessageHandler {
  private rabbitmqUrl: string;
  private queueName: string;
  constructor() {
    this.rabbitmqUrl = config.AMQP_URL;
    this.queueName = config.AMQP_QUEUE_NAME;
  }

  async queueController() {
    try {
      const connection = await amqp.connect(this.rabbitmqUrl);
      const channel = await connection.createChannel();

      await channel.assertQueue(this.queueName, { durable: false });

      channel.consume(this.queueName, async (message) => {
        if (message !== null) {
          const content: MessageContent = JSON.parse(
            message.content.toString()
          );
          try {
            await axios.post(`${config.NODE_URL}/location`, content);

            channel.ack(message);
            console.log("Message saved and removed from queue:", content);
          } catch (e: any) {
            channel.ack(message);
            console.error("Message not removed from queue:", e.response.data);
          }
        }
      });
    } catch (error) {
      console.error("Error removing from queue:", error);
    }
  }
}

export default new RabbitMQMessageHandler();
