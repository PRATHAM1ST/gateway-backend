import express from "express";
import ErrorHandler from "../handler/ErrorHandler";
import auth from "../middleware/authMiddleware";
import createFreeSlotController from "../controllers/createFreeSlot";
import createAppointmentController from "../controllers/createAppointment";

const router = express.Router();

router.post("/create-free-solt", auth, ErrorHandler(createFreeSlotController.POST));
router.post("/create-appointment", auth, ErrorHandler(createAppointmentController.POST));

export default router;
