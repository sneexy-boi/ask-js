import plugin from 'fastify-plugin';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Auth']
	} as const;

	fastify.get(
		'/api/v1/auth/login',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(501).send();
		}
	);
});
