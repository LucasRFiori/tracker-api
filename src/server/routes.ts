import { Router } from "express";
import TrackController from "./controllers/TrackController";

const router = Router();

router.post("/location-queue", TrackController.create);

export default router;
