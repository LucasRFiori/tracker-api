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
      required: true,
      ref: "Device",
    },
    brand: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);
