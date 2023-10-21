import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const Location = model(
  "Location",
  new Schema({
    _id: {
      type: String,
      default: uuidv4,
    },
    deviceId: {
      type: String,
      require: true,
      ref: "Device",
    },
    latitude: {
      type: Number,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);
