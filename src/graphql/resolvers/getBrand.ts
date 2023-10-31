import { Device } from "../../api/models/Device";
import { Location } from "../../api/models/Location";
import { calculateTotalKm } from "../../api/utils/calculateTotalKm";
import { convertDateToISO } from "../../api/utils/convertDateToISO";

interface GetBrandArgs {
  brand: string;
  date: string;
}

export async function getBrand(_: any, args: GetBrandArgs) {
  const brand = args.brand;
  const date = args.date;

  const devicesByBrand = await Device.find({ brand });

  if (!date) {
    const totalKm = devicesByBrand.reduce(
      (acc, curr) => acc + (curr.totals?.totalKm ?? 0),
      0
    );
    const totalPositions = devicesByBrand.reduce(
      (acc, curr) => acc + (curr.totals?.totalPositions ?? 0),
      0
    );

    return {
      deviceCount: devicesByBrand.length,
      brand,
      totalPositions,
      totalKm,
    };
  }

  const isoDate = convertDateToISO(date);

  const locationsByBrand = await Location.find({
    $and: [
      { brand },
      {
        createdAt: {
          $gte: new Date(isoDate),
          $lt: new Date(isoDate).setDate(new Date(isoDate).getDate() + 1),
        },
      },
    ],
  });

  if (!locationsByBrand) {
    return;
  }

  const totalKm = calculateTotalKm(locationsByBrand);

  return {
    deviceCount: devicesByBrand.length,
    brand,
    totalPositions: locationsByBrand.length,
    totalKm,
  };
}
