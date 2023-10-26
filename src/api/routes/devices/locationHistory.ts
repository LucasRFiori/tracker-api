import { Request, Response } from "express";
import { Device } from "../../models/Device";
import { Location } from "../../models/Location";
import { cache } from "../../utils/cacheControl";
import { HTTP } from "../../utils/http";
import { addHateoasToLocations } from "../../utils/addHateoasToLocations";

export async function locationHistory(req: Request, res: Response) {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(HTTP.BAD_REQUEST.CODE).json({
        error: "Missing param.",
      });
    }

    const device = await Device.findById(deviceId);

    if (!device) {
      return res.status(HTTP.NOT_FOUND.CODE).json({
        error: "Device not found.",
      });
    }

    const locationsFromCache = cache.get(deviceId) as typeof locations;

    if (locationsFromCache?.length) {
      const filteredLocationsFromCache = locationsFromCache.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
        createdAt: location.createdAt,
      }));

      const locationsHateoas = addHateoasToLocations(
        filteredLocationsFromCache,
        device._id
      );

      return res.json(locationsHateoas);
    }

    const locations = await Location.find({ deviceId }).select(
      "latitude longitude createdAt -_id"
    );

    if (!locations?.length) {
      return res.status(HTTP.NOT_FOUND.CODE).json({
        error: "Location history not found.",
        device: deviceId,
      });
    }

    const locationsHateoas = addHateoasToLocations(locations, device._id);

    return res.json(locationsHateoas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
