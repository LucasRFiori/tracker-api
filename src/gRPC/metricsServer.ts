import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";

import { RequestType, ResponseType } from "../typings/gRPC.types";
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
    call: grpc.ServerUnaryCall<RequestType, ResponseType>,
    callback: grpc.sendUnaryData<ResponseType>
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
    const oldPositions = await Location.find();

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
});
