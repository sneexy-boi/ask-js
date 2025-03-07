import plugin from 'fastify-plugin';
import { FromSchema } from 'json-schema-to-ts';
import AskService from '../../../../../services/AskService.js';
import UserService from '../../../../../services/UserService.js';
import ReplyService from '../../../../../services/ReplyService.js';

export default plugin(async (fastify) => {
	const schema = {
		tags: ['Ask'],
		params: {
			type: 'object',
			properties: {
				id: { type: 'string' },
				replyId: { type: 'string' }
			},
			required: ['id', 'replyId']
		}
	} as const;

	fastify.delete<{
		Params: FromSchema<typeof schema.params>;
	}>(
		'/api/v1/ask/:id/reply/:replyId',
		{
			schema: schema,
			preHandler: fastify.auth([fastify.requireAuth])
		},
		async (req, reply) => {
			const ask = await AskService.get({ id: req.params.id });

			if (!ask)
				return reply.status(404).send({
					message: 'Ask not found'
				});

			const askReply = await ReplyService.get({ id: req.params.replyId });

			if (!askReply)
				return reply.status(404).send({
					message: 'Reply not found'
				});

			const requestingUser = await UserService.get({
				id: req.auth.user
			});

			if (
				ask.to !== req.auth.user ||
				(requestingUser && !requestingUser.admin) ||
				askReply.user.id !== req.auth.user
			)
				return reply.status(404).send({
					message: 'Ask or reply not found'
				});

			return await ReplyService.delete({ id: req.params.replyId }).then(
				() => {
					return reply.status(200).send({
						message: 'Deleted reply'
					});
				}
			);
		}
	);
});
