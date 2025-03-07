import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import UserService from '../../../../../services/UserService.js';
import AskService from '../../../../../services/AskService.js';
import { IsNull, Not } from 'typeorm';
import CommentService from '../../../../../services/CommentService.js';

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
		body: {
			type: 'object',
			properties: {
				content: { type: ['string'], minLength: 1, maxLength: 8192 }
			}
		}
	} as const;

	fastify.post<{
		Params: FromSchema<typeof schema.params>;
		Body: FromSchema<typeof schema.body>;
	}>(
		'/api/v1/ask/:id/comment',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const ask = await AskService.get({
				id: req.params.id,
				visibility: 'public',
				response: Not(IsNull())
			});

			if (!ask)
				return reply.status(404).send({
					message: 'Ask not found'
				});

			const requestingUser = await UserService.get({
				id: req.auth.user
			});

			if (!requestingUser)
				return reply.status(404).send({ message: 'User not found' });

			return reply
				.status(200)
				.send(
					await CommentService.create(
						requestingUser.id,
						ask.id,
						req.body.content
					)
				);
		}
	);
});
