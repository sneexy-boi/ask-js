import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Ask'],
		body: {
			type: 'object',
			properties: {
				cw: { type: ['string', 'null'] },
				content: { type: ['string'] },
				nickname: { type: ['string', 'null'] }
			}
		}
	} as const;

	fastify.post<{
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/v1/ask',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
