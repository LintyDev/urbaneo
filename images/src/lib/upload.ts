import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.join(__dirname, "../../img");
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + suffix + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 },
}).single("picture");

export default upload;

const storagePOI = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.join(__dirname, "../../img");
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + suffix + path.extname(file.originalname));
	},
});

export const uploadPOI = multer({
	storage: storagePOI,
	limits: { fileSize: 5 * 1024 * 1024 },
}).array("picturePOI", 3);
