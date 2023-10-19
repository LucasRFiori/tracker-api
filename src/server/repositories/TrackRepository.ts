import { TrackControllerCreateBody } from "../controllers/TrackController";

class TrackRepository {
  async sendDataToQueue(body: TrackControllerCreateBody) {
    console.log("Mandou");
    //TODO: ENVIAR DADOS PARA A FILA

    return { message: "success", data: body };
  }
}

export default new TrackRepository();
