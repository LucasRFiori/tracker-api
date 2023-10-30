import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import * as path from "path";
import { config } from "../project.config";

import { RequestType, ResponseType } from "../typings/gRPC.types";
import axios from "axios";
import { Locations } from "../typings/Api.types";
import { calculateDistanceBetweenPoints } from "../api/utils/calculateDistanceBetweenPoints";

const protoObject = protoLoader.loadSync(
  path.resolve(__dirname, "./metrics.proto")
);
const MetricsDefinition: any = grpc.loadPackageDefinition(protoObject);

const server = new grpc.Server();

server.addService(MetricsDefinition.metrics.MetricsService.service, {
  AddLocation: async (
    call: grpc.ServerUnaryCall<RequestType, ResponseType>,
    callback: grpc.sendUnaryData<ResponseType>
  ) => {
    const { deviceId, latitude, longitude } = call.request;

    const { data } = await axios.get<Locations[]>(
      `${config.NODE_URL}/devices/${deviceId}/location`
    );

    const { latitude: lastLatitude, longitude: LastLongitude } =
      data[0].location;

    const positionCount = data.length;

    const totalInKm = calculateDistanceBetweenPoints(
      lastLatitude,
      LastLongitude,
      latitude,
      longitude
    );

    const response = {
      distance: totalInKm,
      positionCount: positionCount + 1,
    };
    callback(null, response);
  },
});

server.bindAsync(
  config.GRPC_URL,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
console.log("Server is running on port 50051");
