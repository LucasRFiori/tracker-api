import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ResponseType } from "../typings/gRPC.types";
import { config } from "../project.config";

const protoObject = protoLoader.loadSync(
  path.resolve(__dirname, "./metrics.proto")
);
const MetricsDefinition: any = grpc.loadPackageDefinition(protoObject);

class MetricsClient {
  client: any;

  constructor() {
    this.client = new MetricsDefinition.metrics.MetricsService(
      config.GRPC_URL,
      grpc.credentials.createInsecure()
    );
  }

  addLocation(deviceId: string, latitude: number, longitude: number) {
    return new Promise<{ distance: number; positionCount: number }>(
      (resolve, reject) => {
        const request = {
          deviceId,
          latitude,
          longitude,
        };

        this.client.AddLocation(
          request,
          (error: any, response: ResponseType) => {
            if (!error) {
              resolve(response);
            } else {
              reject(error);
            }
          }
        );
      }
    );
  }
}

export default new MetricsClient();
