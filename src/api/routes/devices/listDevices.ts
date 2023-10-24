import { Request, Response } from "express";
import { Device } from "../../models/Device";

export async function listDevices(req: Request, res: Response) {
  try {
    const devices = await Device.find();

    return res.json(devices);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
