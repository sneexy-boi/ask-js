import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import { In, IsNull, LessThan, Not } from 'typeorm';
import TimelineService from '../../../../../services/TimelineService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Ask'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' }
			},
			required: ['id']
		},
		querystring: {
			type: 'object',
			properties: {
				since: { type: ['string', 'null'] },
				take: { type: ['number', 'null'] }
			}
		}
	} as const;

	fastify.get<{
		Params: FromSchema<typeof schema.params>;
		Querystring: FromSchema<typeof schema.querystring>;
	}>(
		'/api/v1/ask/:id/replies',
		{
			schema: schema
		},
		async (req, reply) => {
			let where = {
				replyingToId: req.params.id
			};

			let take;

			if (req.query.since) where['createdAt'] = LessThan(req.query.since);
			if (req.query.take) take = req.query.take;

			console.log(where);

			return await TimelineService.get(
				'reply',
				where,
				'reply.createdAt',
				take
			).then((e) => {
				if (e && e.length > 0) return reply.status(200).send(e);
				return reply.status(204).send();
			});
		}
	);
});
