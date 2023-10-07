import express from "express";
import ErrorHandler from "../handler/ErrorHandler";
// import auth from "../middleware/authMiddleware";
import getAllUsersController from "../controllers/users/getAllUsers";

const router = express.Router();

// add auth middleware
router.get("/all", ErrorHandler(getAllUsersController.GET));

export default router;
