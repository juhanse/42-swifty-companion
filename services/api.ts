import axios from 'axios';
import { tokenService } from '@/services/token';

export const api42 = axios.create({
	baseURL: 'https://api.intra.42.fr/v2',
	headers: {
		'User-Agent': 'swifty-companion',
	},
});

api42.interceptors.request.use(async config => {
	const token = await tokenService.getAccessToken();
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

api42.interceptors.response.use(
	res => res,
	async error => {
		if (error.response?.status === 401) {
			const newToken = await tokenService.refreshToken();
			error.config.headers.Authorization = `Bearer ${newToken}`;
			return api42.request(error.config);
		}
		return Promise.reject(error);
	}
);
