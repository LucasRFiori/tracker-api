import TrackRepository from "../repositories/TrackRepository";
import { Request, Response } from "express";

export interface TrackControllerCreateBody {
  clientId: string;
  latitude: string;
  longitude: string;
}

class TrackController {
  async create(request: Request, response: Response) {
    const body = request.body as TrackControllerCreateBody;
    const data = await TrackRepository.sendDataToQueue(body);
    return response.json(data);
  }
}

export default new TrackController();
