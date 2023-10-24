import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Hateoas } from "../../hateoas";
import { config } from "../../../project.config";

export async function listDevices(req: Request, res: Response) {
  try {
    const devices = await Device.find();

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
