import api from '@/services/api';

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

export const fetchUser = async ({ username } : { username: string }): Promise<User> => {
	const res = await api.get<User>('/users/' + username);
	return res.data;
};
