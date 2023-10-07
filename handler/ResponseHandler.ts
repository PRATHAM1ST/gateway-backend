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
		return res.status(200).json({
			success: true,
			data: data,
			message: message,
		});
	}

	public static error({
		req,
		res,
		message,
		errors,
	}: {
		req: Request;
		res: Response;
		message: string;
		errors?: Array<object>;
	}) {
		return res.status(500).json({
			success: false,
			message: message,
			errors: errors,
		});
	}
}
