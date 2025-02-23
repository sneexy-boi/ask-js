import { ObjectLiteral } from 'typeorm';
import db from '../utils/db.js';

class UserService {
	public async get(where: ObjectLiteral) {
		return await db.getRepository('user').findOne({ where: where });
	}

	public async getMany(where: ObjectLiteral) {
		return await db.getRepository('user').find({ where: where });
	}

	public async getPrivate(where: ObjectLiteral) {
		return await db.getRepository('user_private').findOne({ where: where });
	}
}

export default new UserService();
