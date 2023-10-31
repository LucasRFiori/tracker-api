import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Location } from "../../models/Location";
import { cache, clearCacheDaily } from "../../utils/cacheControl";
import { io } from "../..";
import MetricsClient from "../../../gRPC/metricsClient";
import { HTTP } from "../../utils/http";

export async function saveLocation(req: Request, res: Response) {
  try {
    const { deviceCode, latitude, longitude } = req.body;

    if (!deviceCode || !latitude || !longitude) {
      return res.status(400).json({
        error: "Todos os campos obrigatórios devem ser preenchidos.",
      });
    }

    const device = await Device.findOne({ code: deviceCode });
    const currentDistance = device?.totals?.totalKm ?? 0;

    if (!device) {
      return res.status(HTTP.NOT_FOUND.CODE).json({
        error: "Dispositivo não encontrado.",
      });
    }

    if (!device?.active) {
      return res.status(HTTP.NOT_FOUND.CODE).json({
        error: "Dispositivo não está ativo.",
      });
    }

    const payload = {
      deviceId: device._id,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    await MetricsClient.addLocation(device._id, latitude, longitude);

    const location = await Location.create(payload);

    const locationCache = (cache.get(device._id) as (typeof location)[]) ?? [];

    cache.set(device._id, locationCache.concat(location));

    io.emit("location@new", location);

    return res.status(201).json(location);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

clearCacheDaily();
