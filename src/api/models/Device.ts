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
      require: true,
    },
    code: {
      type: String,
      require: true,
      unique: true,
    },
    active: {
      type: Boolean,
      require: true,
    },
    brand: {
      type: String,
      require: true,
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
