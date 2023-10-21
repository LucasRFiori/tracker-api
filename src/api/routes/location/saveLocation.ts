import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Location } from "../../models/Location";

export async function saveLocation(req: Request, res: Response) {
  try {
    const { deviceCode, latitude, longitude } = req.body;

    if (!deviceCode || !latitude || !longitude) {
      return res.status(400).json({
        error: "All mandatory fields should be filled.",
      });
    }

    const device = await Device.findOne({ code: deviceCode });

    if (!device) {
      return res.status(404).json({
        error: "Device not found.",
      });
    }

    if (!device?.active) {
      return res.status(404).json({
        error: "Device isn't active.",
      });
    }

    const location = await Location.create({
      deviceId: device._id,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    return res.status(201).json(location);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}