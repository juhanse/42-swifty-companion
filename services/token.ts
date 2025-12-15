import axios from 'axios';

const AUTH_URL = 'https://api.intra.42.fr/oauth/token';

interface OAuthToken {
	access_token: string,
	expires_in: number,
}

class TokenService {
	private token: OAuthToken | null = null;
	private refreshing: Promise<string> | null = null;

	private isExpired(): boolean {
		return !this.token || Date.now() >= this.token.expires_in;
	}

  	async getAccessToken(): Promise<string> {
		if (!this.token || this.isExpired()) {
			return this.refreshToken();
		}

		return this.token.access_token;
	}

	async refreshToken(): Promise<string> {
		if (this.refreshing) {
			return this.refreshing;
		}

		this.refreshing = (async () => {
			const res = await axios.post(
				AUTH_URL,
				new URLSearchParams({
					grant_type: 'client_credentials',
					client_id: process.env.EXPO_PUBLIC_42_UID!,
					client_secret: process.env.EXPO_PUBLIC_42_SECRET!,
				}),
				{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
			);

			const expiresIn = res.data.expires_in * 1000;
			this.token = {
				access_token: res.data.access_token,
				expires_in: Date.now() + expiresIn - 60_000,
			};

			this.refreshing = null;
			return this.token.access_token;
		})();

		return this.refreshing;
	}
}

export const tokenService = new TokenService();
