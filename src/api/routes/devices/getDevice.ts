import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Hateoas } from "../../hateoas";
import { config } from "../../../project.config";
import { HTTP } from "../../utils/http";

export async function getDevice(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(HTTP.BAD_REQUEST.CODE).json({
        error: "Need a device id.",
      });
    }

    const device = await Device.findById(deviceId);

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
