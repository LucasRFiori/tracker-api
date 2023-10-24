import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Location } from "../../models/Location";
import { cache } from "../../utils/cacheControl";

export async function locationHistory(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(404).json({
        error: "Missing param.",
      });
    }

    const device = await Device.findById(deviceId);

    if (!device) {
      return res.status(404).json({
        error: "Device not found.",
      });
    }

    const locationsFromCache = cache.get(deviceId) as typeof locations;

    if (locationsFromCache.length) {
      const filteredLocationsFromCache = locationsFromCache.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
        createdAt: location.createdAt,
      }));

      return res.json(filteredLocationsFromCache);
    }

    const locations = await Location.find({ deviceId }).select(
      "latitude longitude createdAt -_id"
    );

    if (!locations.length) {
      return res.status(404).json({
        error: "Location history not found.",
        device: deviceId,
      });
    }

    return res.json(locations);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
