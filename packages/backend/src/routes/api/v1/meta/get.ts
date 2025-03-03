import plugin from 'fastify-plugin';
import pkg from '../../../../../../../package.json' with { type: 'json' };
import config from '../../../../../../../config/config.json' with { type: 'json' };
import db from '../../../../utils/db.js';

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
			let userCount = await db.getRepository('user').count();
			let askCount = await db.getRepository('ask').count();

			return reply.status(200).send({
				version: pkg.version,
				registrations: config.registrations ?? 'closed',
				stats: {
					asks: askCount,
					users: userCount
				}
			});
		}
	);
});
