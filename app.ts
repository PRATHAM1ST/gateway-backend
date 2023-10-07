import 'dotenv/config'

import { Request, Response } from "express";
import ResponseHandler from "./handler/ResponseHandler";
import authRoute from "./routes/auth";

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");


app.use(cors());
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

export default app;
