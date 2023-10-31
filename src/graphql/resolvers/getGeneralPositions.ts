import { Device } from "../../api/models/Device";
import { Location } from "../../api/models/Location";
import { calculateTotalKm } from "../../api/utils/calculateTotalKm";
import { convertDateToISO } from "../../api/utils/convertDateToISO";

interface GetGeneralPositions {
  date: string;
}

export async function getGeneralPositons(_: any, args: GetGeneralPositions) {
  const date = args.date;

  if (!date) {
    const [locations, devices] = await Promise.all([
      Location.find(),
      Device.find(),
    ]);

    if (!locations.length) {
      return;
    }

    const totalKm = calculateTotalKm(locations);

    return {
      deviceCount: devices.length,
      totalPositions: locations.length,
      totalKm,
    };
  }

  const isoDate = convertDateToISO(date);

  const [locationsByDate, devices] = await Promise.all([
    await Location.find({
      createdAt: {
        $gte: new Date(isoDate),
        $lt: new Date(isoDate).setDate(new Date(isoDate).getDate() + 1),
      },
    }),
    Device.find(),
  ]);

  const totalKm = calculateTotalKm(locationsByDate);

  return {
    deviceCount: devices.length,
    totalPositions: locationsByDate.length,
    totalKm,
  };
}
