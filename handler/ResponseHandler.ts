import { Request, Response } from "express";

export default class ResponseHandler {
	public static success({
		req,
		res,
		data,
		message,
	}: {
		req: Request;
		res: Response;
		data: Array<object> | object | string;
		message: string;
	}) {
		res.status(200).json({
			status: true,
			data: data,
			message: message,
		});
	}

	public static error(
		req: Request,
		res: Response,
		message: string = "Error"
	) {
		res.status(500).json({
			status: false,
			message: message,
		});
	}
}
