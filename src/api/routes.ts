import { Router } from "express";
import { createDevice } from "./routes/device/createDevice";
import { listDevices } from "./routes/device/listDevices";
import { deleteDevice } from "./routes/device/deleteDevice";
import { getDevice } from "./routes/device/getDevice";
import { updateDevice } from "./routes/device/updateDevice";
import { saveLocation } from "./routes/location/saveLocation";
import { locationHistory } from "./routes/device/locationHistory";

const router = Router();

// Device
router.get("/device", listDevices);
router.get("/device/:deviceId", getDevice);
router.post("/device", createDevice);
router.delete("/device/:deviceId", deleteDevice);
router.patch("/device/:deviceId", updateDevice);
router.get("/device/:deviceId/location", locationHistory);

//Location
router.post("/location", saveLocation);

export default router;
