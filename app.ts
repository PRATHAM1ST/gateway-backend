import 'dotenv/config'

import { Request, Response } from "express";
import ResponseHandler from "./handler/ResponseHandler";
import authRoute from "./routes/auth";
import sloteRoute from "./routes/slot";
import usersRoute from "./routes/users";
import teamRoute from "./routes/team";

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
var cookieParser = require('cookie-parser')

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	ResponseHandler.success({
		req,
		res,
		data: "Hello World",
		message: "Connection Success",
	});
});

app.use("/auth", authRoute);
app.use("/slot", sloteRoute);
app.use("/users", usersRoute);
app.use("/team", teamRoute);

export default app;
