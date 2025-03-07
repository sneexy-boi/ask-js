import { ObjectLiteral } from 'typeorm';
import db from '../utils/db.js';
import IdService from './IdService.js';
import SanitizerService from './SanitizerService.js';
import AskService from './AskService.js';

class ReplyService {
	public async get(where: ObjectLiteral) {
		return await db
			.getRepository('reply')
			.createQueryBuilder('reply')
			.leftJoinAndSelect('reply.user', 'user')
			.where(where)
			.getOne();
	}

	public async getMany(where: ObjectLiteral, order?: string, take?: number) {
		return await db
			.getRepository('reply')
			.createQueryBuilder('reply')
			.leftJoinAndSelect('reply.user', 'user')
			.where(where)
			.orderBy(order, 'DESC')
			.take(take ?? 45)
			.getMany();
	}

	public async create(as: string, replyingTo: string, content: string) {
		const replyingToAsk = await AskService.get({ id: replyingTo });

		if (!replyingTo)
			return {
				error: true,
				status: 404,
				message: 'Ask not found'
			};

		const id = IdService.generate();

		const reply = {
			id: id,
			userId: as,
			replyingToId: replyingTo,
			content: SanitizerService.sanitize(content),
			createdAt: new Date().toISOString()
		};

		await db.getRepository('reply').insert(reply);

		return {
			error: false,
			status: 200,
			message: 'Reply created',
			reply: await this.get({ id: id })
		};
	}

	public async delete(where: ObjectLiteral) {
		return await db.getRepository('reply').delete(where);
	}
}

export default new ReplyService();
