import axios from "axios";

export default axios.create({
	baseURL: process.env.NEXT_PUBLIC_IMAGES_URL,
	withCredentials: true,
	headers: { "Content-Type": "multipart/form-data" },
});
