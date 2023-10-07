import express from "express";
import signinController from "../controllers/signin";
import signupController from "../controllers/signup";
import ErrorHandler from "../handler/ErrorHandler";

const router = express.Router();

router.post("/signin", ErrorHandler(signinController.POST));
router.post("/signup", ErrorHandler(signupController.POST));

export default router;
