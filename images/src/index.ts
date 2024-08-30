import express from "express";
import cors from "cors";
import multer from "multer";
import checkToken from "./middlewares/token";
import path from "path";
import fs from "fs";
import upload from "./lib/upload";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: process.env.URL_FRONTEND ?? "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.get("/hello", (req, res) => {
	res.send("Welcome to Urbaneo Images Server");
});

app.get("/:img", (req, res) => {
	console.log("get img", req.params.img);
	const img = req.params.img;
	const imgPath = path.dirname(__dirname) + "/img/" + img;

	fs.readFile(imgPath, (err) => {
		if (err) return res.sendStatus(404);
		return res.sendFile(imgPath);
	});
});

// app.use(checkToken);

app.post("/img", function (req, res) {
	console.log("post img");
	upload(req, res, function (err: any) {
		if (err instanceof multer.MulterError) {
			return res.json({ message: err.message, success: false });
		} else if (err) {
			return res.json({ message: err.message, success: false });
		}

		console.log("IMAGES SAVES", req.file?.filename);
		return res.json({
			filename: req.file?.filename,
			success: true,
		});
	});
});

app.listen(4005, () => {
	console.log("Images server launch at http://localhost:4005");
});
