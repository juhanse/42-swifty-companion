import { api42 } from '@/services/api';

export type Achievement = {
	id: number,
	name: string,
	description: string,
	tier: string,
	kind: string,
	visible: boolean,
	image: string,
	nbr_of_success: number,
};

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
	image: {
		link: string
	},
	groups: {
		id: number,
		name: string,
	}[],
	achievements: Achievement[],
	titles: {},
};

export const fetchUser = async ({ login } : { login: string }): Promise<User> => {
	const res = await api42.get(`/users/${login}`);
	return res.data;
};
