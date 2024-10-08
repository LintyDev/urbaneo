import { NextFunction, Request, Response } from "express";
import * as jose from "jose";
import { Payload } from "../types/common";

async function checkToken(req: Request, res: Response, next: NextFunction) {
	// console.log(req.cookies);
	next();
	return;
	const header = req.headers["authorization"];
	const token = header?.split(" ")[1] || req.cookies.token;
	if (!token) {
		console.log("missing token");
		return res.sendStatus(401);
	}

	try {
		const secret_key = new TextEncoder().encode(`${process.env.SECRET_KEY}`);
		const verify = await jose.jwtVerify<Payload>(token, secret_key);
		req.body.email = verify.payload.email;
		console.log("valid : ", req.body.email);
		next();
	} catch (error) {
		console.log("token not valid", token);
		return res.sendStatus(403);
	}
}

export default checkToken;
