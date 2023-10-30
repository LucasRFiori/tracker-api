export interface RequestType {
  deviceId: string;
  brand: string;
  latitude: number;
  longitude: number;
}

export interface ResponseType {
  distance: number;
  positionCount: number;
}
