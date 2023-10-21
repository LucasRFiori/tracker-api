import { Request, Response } from "express";
import { Device } from "../../models/Device";

export async function getDevice(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(400).json({
        error: "Need a device id.",
      });
    }

    const device = await Device.findById(deviceId);

    if (!device) {
      return res.status(404).json({
        error: "Device not found.",
      });
    }

    return res.json(device);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
