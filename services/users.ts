import { api42 } from '@/services/api';

export type User = {
	id: string,
	email: string,
	login: string,
	first_name: string,
	last_name: string,
	url: string,
	displayname: string,
	correction_point: number,
	wallet: number,
	achievements: {},
	titles: {},
};

export const fetchUser = async ({ login } : { login: string }): Promise<User> => {
	const res = await api42.get<User>('/users/' + login);
	return res.data;
};
