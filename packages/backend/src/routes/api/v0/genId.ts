import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import IdService from '../../../services/IdService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['v0']
	} as const;

	fastify.get<{}>(
		'/api/v0/genId',
		{
			schema: schema
		},
		async (req, reply) => {
			return reply.status(200).send(IdService.generate());
		}
	);
});
