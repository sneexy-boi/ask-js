import crypto from 'crypto';
import db from '../utils/db.js';
import { ObjectLiteral } from 'typeorm';

class AutopostService {
	public async get(where: ObjectLiteral) {
		return await db
			.getRepository('autopost_target')
			.findOne({ where: where });
	}

	public async getMany(where: ObjectLiteral) {
		return await db
			.getRepository('autopost_target')
			.createQueryBuilder('autopost_target')
			.where(where)
			.getMany();
	}

	public async delete(where: ObjectLiteral) {
		return await db.getRepository('autopost_target').delete(where);
	}
}

export default new AutopostService();
