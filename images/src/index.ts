import express from "express";
import cors from "cors";
import multer from "multer";
import checkToken from "./middlewares/token";
import path from "path";
import fs from "fs";
import upload, { uploadPOI } from "./lib/upload";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin:
			process.env.URL_FRONTEND === undefined
				? "http://localhost:3000"
				: process.env.URL_FRONTEND,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.get("/picture/hello", (req, res) => {
	res.send("Welcome to Urbaneo Images Server");
});

app.get("/picture/:img", (req, res) => {
	const img = req.params.img;
	const imgPath = path.dirname(__dirname) + "/img/" + img;

	fs.readFile(imgPath, (err) => {
		if (err) return res.sendStatus(404);
		return res.sendFile(imgPath);
	});
});

app.post("/picture/img", function (req, res) {
	upload(req, res, function (err: any) {
		if (err instanceof multer.MulterError) {
			return res.json({ message: err.message, success: false });
		} else if (err) {
			return res.json({ message: err.message, success: false });
		}

		return res.json({
			filename: req.file?.filename,
			success: true,
		});
	});
});

app.use(checkToken);

app.post("/picture/imgPoi", function (req, res) {
	uploadPOI(req, res, function (err: any) {
		if (err instanceof multer.MulterError) {
			return res.json({ message: err.message, success: false });
		} else if (err) {
			return res.json({ message: err.message, success: false });
		}

		let fileNames: string[] = [];
		if (req.files && Array.isArray(req.files)) {
			fileNames = req.files.map((file) => file.filename);
		}
		return res.json({
			success: true,
			fileNames: fileNames,
		});
	});
});

app.post("/picture/deleteImg", function (req, res) {
	const path = `/images/img/${req.body.pictureName}`;
	fs.unlink(path, (err) => {
		if (err) {
			return res.json({ message: err.message, success: false });
		} else {
			return res.json({
				success: true,
			});
		}
	});
});

app.listen(4005, () => {
	console.log("Images server launch at http://localhost:4005");
});
