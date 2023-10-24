import { Request, Response } from "express";
import { Device } from "../../models/Device";

export async function deleteDevice(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(400).json({
        error: "Need a device id to remove.",
      });
    }

    await Device.findByIdAndDelete(deviceId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
