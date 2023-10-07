import express from "express";
import ErrorHandler from "../handler/ErrorHandler";
import auth from "../middleware/authMiddleware";
import createTeamController from "../controllers/team/createTeam";
import addUserToTeamController from "../controllers/team/addUserToTeam";

const router = express.Router();

router.post("/create", auth, ErrorHandler(createTeamController.POST));
router.post("/add-user", auth, ErrorHandler(addUserToTeamController.POST));

export default router;
