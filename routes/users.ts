import express from "express";
import ErrorHandler from "../handler/ErrorHandler";
// import auth from "../middleware/authMiddleware";
import getAllUsersController from "../controllers/users/getAllUsers";
import checkForUniqueUsername from "../controllers/users/checkForUniqueUsername";

const router = express.Router();

// add auth middleware
router.get("/all", ErrorHandler(getAllUsersController.GET));
router.get("/check-unique-username/:username", ErrorHandler(checkForUniqueUsername.GET));

export default router;
