import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const Device = model(
  "Device",
  new Schema({
    _id: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    totals: {
      totalPositions: {
        type: Number,
      },
      totalKm: {
        type: Number,
      },
    },
  })
);
