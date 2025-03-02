import plugin from 'fastify-plugin';
import pkg from '../../../../../../../package.json' with { type: 'json' };

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Meta']
	} as const;

	fastify.get(
		'/api/v1/meta',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(200).send({
				version: pkg.version,
				name: process.env.NAME,
				registrations: process.env.REGISTRATIONS ?? 'closed'
			});
		}
	);
});
