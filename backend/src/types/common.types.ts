import express from "express";
import { User } from "../entities/User.entity";

export default interface MyContext {
	req: express.Request;
	res: express.Response;
	user: User | null;
}

export interface Payload {
	email: string;
}
