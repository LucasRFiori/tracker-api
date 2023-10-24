import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Hateoas } from "../../hateoas";
import { config } from "../../../project.config";
import { HTTP } from "../../utils/http";

export async function updateDevice(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!req.body) {
      return res.status(HTTP.BAD_REQUEST.CODE).json({
        error: "Need a field to update.",
      });
    }

    const device = await Device.findByIdAndUpdate(deviceId, { ...req.body });

    if (!device) {
      return res.status(HTTP.NOT_FOUND.CODE).json({
        error: "Device not found.",
      });
    }

    return res.status(HTTP.OK.CODE).json({
      device,
      links: Hateoas.createResourceLinks(
        `${config.NODE_URL}/devices`,
        device._id
      ),
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
