import plugin from 'fastify-plugin';
import AuthService from '../../../../services/AuthService.js';
import { FromSchema } from 'json-schema-to-ts';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Auth'],
		body: {
			type: 'object',
			properties: {
				username: { type: 'string', minLength: 1, maxLength: 100 },
				password: { type: 'string', minLength: 1, maxLength: 72 }
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/v1/auth/login',
		{
			schema: schema
		},
		async (req, reply) => {
			return await AuthService.loginUser(
				req.body.username,
				req.body.password
			).then((e) => {
				return reply.status(e.status).send({
					message: e.message,
					user: e.user,
					token: e.token
				});
			});
		}
	);
});
