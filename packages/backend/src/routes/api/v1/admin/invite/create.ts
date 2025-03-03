import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import UserService from '../../../../../services/UserService.js';
import InviteService from '../../../../../services/InviteService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin']
	} as const;

	fastify.post<{}>(
		'/api/v1/admin/invite',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const requestingUser = await UserService.get({
				id: req.auth.user
			});

			if (!requestingUser || !requestingUser.admin)
				return reply
					.status(403)
					.send({ message: 'You are not an admin' });

			return reply
				.status(200)
				.send(await InviteService.create(requestingUser.id));
		}
	);
});
