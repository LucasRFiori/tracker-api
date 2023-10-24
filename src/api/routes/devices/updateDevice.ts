import { Request, Response } from "express";
import { Device } from "../../models/Device";

export async function updateDevice(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!req.body) {
      return res.status(400).json({
        error: "Need a field to update.",
      });
    }

    await Device.findByIdAndUpdate(deviceId, { ...req.body });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
