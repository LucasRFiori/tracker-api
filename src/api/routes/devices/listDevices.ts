import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Hateoas } from "../../hateoas";
import { config } from "../../../project.config";
import { HTTP } from "../../utils/http";

export async function listDevices(req: Request, res: Response) {
  try {
    const devices = await Device.find();

    if (!devices?.length) {
      return res.status(HTTP.NOT_FOUND.CODE).json({
        error: "Not found any devices.",
      });
    }

    const devicesHateoas = devices.map((device) => ({
      device,
      links: Hateoas.createResourceLinks(
        `${config.NODE_URL}/devices`,
        device._id
      ),
    }));

    return res.json(devicesHateoas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
