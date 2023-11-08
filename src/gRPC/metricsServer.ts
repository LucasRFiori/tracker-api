import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";

import {
  AddLocationRequestType,
  AddLocationResponseType,
  UpdateDeviceBrandRequest,
  UpdateDeviceBrandResponse,
} from "../typings/gRPC.types";
import { calculateDistanceBetweenPoints } from "../api/utils/calculateDistanceBetweenPoints";
import { Location } from "../api/models/Location";
import { Device } from "../api/models/Device";

const protoObject = protoLoader.loadSync(
  path.resolve(__dirname, "./metrics.proto")
);
const MetricsDefinition: any = grpc.loadPackageDefinition(protoObject);

export const metricsServer = new grpc.Server();

metricsServer.addService(MetricsDefinition.metrics.MetricsService.service, {
  AddLocation: async (
    call: grpc.ServerUnaryCall<AddLocationRequestType, AddLocationResponseType>,
    callback: grpc.sendUnaryData<AddLocationResponseType>
  ) => {
    const { deviceId, latitude, longitude } = call.request;

    const lastLocation = await Location.find({ deviceId })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!lastLocation?.length) {
      return callback(null, {
        distance: 0,
        positionCount: 0,
      });
    }

    const device = await Device.findById(deviceId);

    const oldTotalKm = device?.totals?.totalKm ?? 0;
    const oldPositions = await Location.find({ deviceId });

    const { latitude: lastLatitude = 0, longitude: lastLongitude = 0 } =
      lastLocation[0];

    const totalInKm = calculateDistanceBetweenPoints(
      lastLatitude,
      lastLongitude,
      latitude,
      longitude
    );

    await Device.findByIdAndUpdate(device?._id, {
      totals: {
        totalPositions: oldPositions.length + 1,
        totalKm: oldTotalKm + totalInKm,
      },
    });

    const response = {
      distance: oldTotalKm + totalInKm,
      positionCount: oldPositions.length + 1,
    };

    callback(null, response);
  },
  UpdateDeviceBrand: async (
    call: grpc.ServerUnaryCall<
      UpdateDeviceBrandRequest,
      UpdateDeviceBrandResponse
    >,
    callback: grpc.sendUnaryData<UpdateDeviceBrandResponse>
  ) => {
    const { deviceId, newBrand } = call.request;

    try {
      const updatedLocations = await Location.find({ deviceId }).updateMany({
        brand: newBrand,
      });

      if (!updatedLocations) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: "Locations not found.",
        });
      }

      const response = {
        success: true,
      };

      callback(null, response);
    } catch (error) {
      console.error(error);
      return callback({
        code: grpc.status.INTERNAL,
        details: "Internal server error.",
      });
    }
  },
});
