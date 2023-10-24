import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Location } from "../../models/Location";
import { cache, clearCacheDaily } from "../../utils/cacheControl";

export async function saveLocation(req: Request, res: Response) {
  try {
    const { deviceCode, latitude, longitude } = req.body;

    if (!deviceCode || !latitude || !longitude) {
      return res.status(400).json({
        error: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const device = await Device.findOne({ code: deviceCode });

    if (!device) {
      return res.status(404).json({
        error: "Dispositivo não encontrado.",
      });
    }

    if (!device?.active) {
      return res.status(404).json({
        error: "Dispositivo não está ativo.",
      });
    }

    const payload = {
      deviceId: device._id,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    const location = await Location.create(payload);

    const locationCache = (cache.get(device._id) as (typeof location)[]) ?? [];

    cache.set(device._id, locationCache.concat(location));

    return res.status(201).json(location);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

clearCacheDaily();
