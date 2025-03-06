import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import UserService from '../../../../services/UserService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['User']
	} as const;

	fastify.get(
		'/api/v1/users',
		{
			schema: schema
		},
		async (req, reply) => {
			const users = await UserService.getMany({}, 'user.id');

			if (!users)
				return reply.status(404).send({ message: 'Users not found' });

			return reply.status(200).send(users);
		}
	);
});
