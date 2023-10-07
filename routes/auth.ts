import express from "express";
import signinController from "../controllers/signin";
import signupController from "../controllers/signup";
import otpController from "../controllers/otpChecker";
import ErrorHandler from "../handler/ErrorHandler";
import auth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signin", ErrorHandler(signinController.POST));
router.post("/signup", ErrorHandler(signupController.POST));
router.post("/verify", auth, ErrorHandler(otpController.POST));

export default router;
