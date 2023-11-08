export interface AddLocationRequestType {
  deviceId: string;
  brand: string;
  latitude: number;
  longitude: number;
}

export interface AddLocationResponseType {
  distance: number;
  positionCount: number;
}

export interface UpdateDeviceBrandRequest {
  deviceId: string;
  newBrand: string;
}

export interface UpdateDeviceBrandResponse {
  success: boolean;
}
