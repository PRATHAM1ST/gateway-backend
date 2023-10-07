import { Request, Response } from "express";
import ResponseHandler from "./handler/ResponseHandler";

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
	ResponseHandler.success({
		req,
		res,
		data: "Hello World",
		message: "Connection Success",
	});
});

export default app;
