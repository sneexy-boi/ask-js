import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Admin']
	} as const;

	fastify.delete<{}>(
		'/api/v1/admin/invite',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
