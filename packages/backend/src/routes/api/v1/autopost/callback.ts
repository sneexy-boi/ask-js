import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import AskService from '../../../../services/AskService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Autopost'],
		params: {
			type: 'object',
			properties: {
				token: { type: 'string' }
			},
			required: ['token']
		}
	} as const;

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/v1/autopost/callback/:token',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
