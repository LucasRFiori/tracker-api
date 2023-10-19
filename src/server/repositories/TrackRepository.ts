import amqp from "amqplib/callback_api";
import { config } from "../../project.config";

class TrackRepository {
  private channel: any;

  constructor() {
    amqp.connect("amqp://admin:admin@localhost", (error, connection) => {
      if (error) {
        throw error;
      }

      connection.createChannel((error, channel) => {
        if (error) {
          throw error;
        }

        this.channel = channel;
      });
    });
  }

  async sendDataToQueue(body: any) {
    if (!this.channel) {
      throw new Error(
        "Canal não está pronto. Verifique a conexão com RabbitMQ."
      );
    }

    const message = JSON.stringify(body);

    this.channel.assertQueue(config.AMQP_QUEUE_NAME, { durable: false });
    this.channel.sendToQueue(config.AMQP_QUEUE_NAME, Buffer.from(message));

    return { message: "📨 Added to queue successfully", data: body };
  }
}

export default new TrackRepository();
