import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
	baseURL: "https://sqrmtest3.free.beeceptor.com",
	headers: {
		"Content-Type": "application/json",
	},
});
