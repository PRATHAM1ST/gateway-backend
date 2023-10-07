import { NextFunction, Request, Response } from "express";
import ResponseHandler from "./ResponseHandler";

const ErrorHandler = (
	fn: (req: Request, res: Response, next?: NextFunction) => Promise<Response>
) =>
	function (req: Request, res: Response, next: NextFunction) {
		Promise.resolve(fn(req, res, next)).catch((err: Error) => {
			return ResponseHandler.error({
				req,
				res,
				message: err.message,
			});
		});
	};

export default ErrorHandler;
