import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Autopost'],
		body: {
			type: 'object',
			properties: {
				type: { type: 'string', enum: ['mastodon', 'misskey'] },
				domain: { type: 'string', maxLength: 500 }
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/v1/autopost/target',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
