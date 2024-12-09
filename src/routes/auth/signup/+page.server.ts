import { fail } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		try {
			const response = await fetch('https://chat-node-naveenterances-projects.vercel.app/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					'Access-Control-Allow-Headers':
						'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
				},
				body: JSON.stringify({ name, email, password })
			});

			const data = await response.json();

			if (response.ok) {
				return { success: true, message: 'User registered successfully!' };
			} else {
				return fail(400, { error: data.error || 'Signup failed' });
			}
		} catch (error) {
			console.error('Failed to signup:', error);
			return fail(500, { error: 'Internal server error' });
		}
	}
};
