import { api42 } from '@/services/api';

export interface TeamUser {
	id: number;
    login: string;
	image: {
		link: string
	};
};

export interface ProjectUser {
	id: number;
	final_mark: number;
	status: string;
	"validated?": boolean;
	current_team_id: number;
    marked_at: string;
	project: {
        name: string;
        slug: string;
    };
};

export const fetchTeamUsers = async ({ id } : { id: number }): Promise<TeamUser[]> => {
	const res = await api42.get(`/teams/${id}/users`);
	return res.data;
};
