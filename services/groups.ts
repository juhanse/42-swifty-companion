import { api42 } from '@/services/api';

export type Group = {
	image: {
		link: string,
	},
};

export const fetchGroup = async ({ id } : { id: number }): Promise<Group> => {
	const res = await api42.get(`/teams/${id}/users`);
	return res.data;
};
