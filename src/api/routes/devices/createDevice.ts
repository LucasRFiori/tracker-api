import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Hateoas } from "../../hateoas";
import { config } from "../../../project.config";

export async function createDevice(req: Request, res: Response) {
  try {
    const { name, code, active, brand } = req.body;

    if (!name || !code || !active || !brand) {
      return res.status(400).json({
        error: "All mandatory fields should be filled.",
      });
    }

    const device = await Device.create({
      name,
      code,
      active,
      brand,
    });

    return res
      .status(201)
      .json({
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
