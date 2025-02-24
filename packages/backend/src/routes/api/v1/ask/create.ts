import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import AuthService from '../../../../services/AuthService.js';
import AskService from '../../../../services/AskService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Ask'],
		body: {
			type: 'object',
			properties: {
				to: { type: ['string'], minLength: 1, maxLength: 8192 },
				cw: { type: ['string', 'null'], maxLength: 500 },
				content: { type: ['string'], minLength: 1, maxLength: 8192 },
				visibility: { type: ['string'], maxLength: 15 },
				nickname: { type: ['string', 'null'], maxLength: 100 }
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
			return await AskService.create(
				req.body.to,
				req.body.content,
				req.body.visibility,
				req.body.cw,
				req.body.nickname
			).then((e) => {
				return reply.status(e.status).send({
					message: e.message,
					ask: e.ask
				});
			});
		}
	);
});
