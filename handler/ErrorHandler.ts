import { NextFunction, Request, Response } from "express";
import ResponseHandler from "./ResponseHandler";
import { z } from "zod";

const ErrorHandler = (
	fn: (req: Request, res: Response, next?: NextFunction) => Promise<Response>
) =>
	function (req: Request, res: Response, next: NextFunction) {
		Promise.resolve(fn(req, res, next)).catch((err: Error & {errors? : z.ZodError[]}) => {
			if(err instanceof z.ZodError) {
				res.status(406);
				return ResponseHandler.error({
					req,
					res,
					message: "Validation failed",
					errors: err.errors
				});
			}
			res.status(500);
			return ResponseHandler.error({
				req,
				res,
				message: err.message,
				errors: err.errors
			});
		});
	};

export default ErrorHandler;
