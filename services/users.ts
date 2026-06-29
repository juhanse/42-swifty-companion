import { api42 } from '@/services/api';
import { ProjectUser } from '@/services/projects';

export type User = {
	id: string,
	email: string,
	login: string,
	first_name: string,
	last_name: string,
	url: string,
	displayname: string,
	image: {
		link: string
	},
	correction_point: number,
	wallet: number,
	groups: {
		id: number,
		name: string,
	}[],
	cursus_users: {
		grade: string,
		level: number,
		skills: {
			id: number,
			name: string,
			level: number
		}[]
	}[],
	projects_users: ProjectUser[]
};

export const fetchUser = async ({ login }: { login: string }): Promise<User> => {
	const res = await api42.get(`/users/${login}`);
	return res.data;
};
