import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
	baseURL: "https://sqrmtest.free.beeceptor.com",
	headers: {
		"Content-Type": "application/json",
	},
});
