import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { HTTP } from "../../utils/http";

export async function deleteDevice(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(HTTP.BAD_REQUEST.CODE).json({
        error: "Missing device id.",
      });
    }

    await Device.findByIdAndDelete(deviceId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
