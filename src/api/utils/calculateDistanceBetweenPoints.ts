function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateDistanceBetweenPoints(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Radius of the Earth in kilometers
  const earthRadiusKm = 6371;

  const lat1Radians = degreesToRadians(lat1);
  const lon1Radians = degreesToRadians(lon1);
  const lat2Radians = degreesToRadians(lat2);
  const lon2Radians = degreesToRadians(lon2);

  const latDiff = lat2Radians - lat1Radians;
  const lonDiff = lon2Radians - lon1Radians;

  // Haversine formula
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;

  return distance;
}
