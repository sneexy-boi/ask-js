import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import AskService from '../../../../services/AskService.js';
import AutopostService from '../../../../services/AutopostService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Autopost']
	} as const;

	fastify.get<{}>(
		'/api/v1/autopost/targets',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const targets = await AutopostService.getMany({
				user: req.auth.user
			});

			return reply.status(200).send(targets);
		}
	);
});
