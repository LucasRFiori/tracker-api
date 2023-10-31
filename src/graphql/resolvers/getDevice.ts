import { Device } from "../../api/models/Device";
import { Location } from "../../api/models/Location";
import { calculateTotalKm } from "../../api/utils/calculateTotalKm";
import { convertDateToISO } from "../../api/utils/convertDateToISO";

interface GetDeviceArgs {
  deviceId: string;
  date: string;
}

export async function getDevice(_: any, args: GetDeviceArgs) {
  const deviceId = args.deviceId;
  const date = args.date;

  const deviceById = await Device.findById(deviceId).sort(
    "brand totals.totalPositions totals.totalKm"
  );

  if (!date) {
    return {
      deviceId: deviceById?._id,
      brand: deviceById?.brand,
      totalPositions: deviceById?.totals?.totalPositions,
      totalKm: deviceById?.totals?.totalKm,
    };
  }

  const isoDate = convertDateToISO(date);

  const locationsByDeviceId = await Location.find({
    $and: [
      { deviceId },
      {
        createdAt: {
          $gte: new Date(isoDate),
          $lt: new Date(isoDate).setDate(new Date(isoDate).getDate() + 1),
        },
      },
    ],
  });

  if (!locationsByDeviceId) {
    return;
  }

  const totalKm = calculateTotalKm(locationsByDeviceId);

  return {
    deviceId: deviceById?._id,
    brand: deviceById?.brand,
    totalPositions: locationsByDeviceId?.length,
    totalKm,
  };
}
