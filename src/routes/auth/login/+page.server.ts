import { fail } from '@sveltejs/kit';

export const actions = {
	login: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const password = formData.get('password');

		try {
			const response = await fetch(
				'https://chat-node-naveenterances-projects.vercel.app/users/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Credentials': 'true',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
						'Access-Control-Allow-Headers':
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
					},
					body: JSON.stringify({ name, password })
				}
			);

			const data = await response.json();

			if (response.ok) {
				return { success: true, token: data.token };
			} else {
				return fail(400, { error: 'Invalid credentials' });
			}
		} catch (error) {
			console.error('Failed to login:', error);
			return fail(500, { error: 'Internal server error' });
		}
	}
};
