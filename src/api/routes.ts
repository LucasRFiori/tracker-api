import { Router } from "express";
import { createDevice } from "./routes/devices/createDevice";
import { listDevices } from "./routes/devices/listDevices";
import { deleteDevice } from "./routes/devices/deleteDevice";
import { getDevice } from "./routes/devices/getDevice";
import { updateDevice } from "./routes/devices/updateDevice";
import { saveLocation } from "./routes/location/saveLocation";
import { locationHistory } from "./routes/devices/locationHistory";

const router = Router();

// Device
router.get("/devices", listDevices);
router.get("/devices/:deviceId", getDevice);
router.get("/devices/:deviceId/location", locationHistory);
router.post("/devices", createDevice);
router.delete("/devices/:deviceId", deleteDevice);
router.patch("/devices/:deviceId", updateDevice);

//Location
router.post("/location", saveLocation);

export default router;
