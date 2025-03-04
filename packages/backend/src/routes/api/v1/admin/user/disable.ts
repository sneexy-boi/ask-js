import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import UserService from '../../../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		}
	} as const;

	fastify.post<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/v1/admin/user/:id/disable',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const user = await UserService.get({
				id: req.params.id
			});

			if (!user)
				return reply
					.status(404)
					.send({ message: 'User does not exist' });

			const requestingUser = await UserService.get({
				id: req.auth.user
			});

			if (!requestingUser || !requestingUser.admin)
				return reply
					.status(403)
					.send({ message: 'You are not an admin' });

			return await UserService.update(
				{
					id: user.id
				},
				{
					approved: false
				}
			).then(() => {
				return reply.status(200).send();
			});
		}
	);
});
