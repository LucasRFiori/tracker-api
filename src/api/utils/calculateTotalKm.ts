import { Location } from "../../typings/Api.types";
import { calculateDistanceBetweenPoints } from "./calculateDistanceBetweenPoints";

export function calculateTotalKm(locations: Location[]) {
  return locations.reduce((total, currentLocation, index) => {
    if (index === 0) return total;

    const oldCoords = locations[index - 1];
    const acCoords = currentLocation;

    const distance = calculateDistanceBetweenPoints(
      oldCoords.latitude ?? 0,
      oldCoords.longitude ?? 0,
      acCoords.latitude ?? 0,
      acCoords.longitude ?? 0
    );

    return total + distance;
  }, 0);
}
