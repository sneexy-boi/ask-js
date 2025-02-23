import crypto from 'crypto';
import { ObjectLiteral } from 'typeorm';
import IdService from './IdService';

class UserService {
	public async get(where: ObjectLiteral) {
		return;
	}

	public async getMany(where: ObjectLiteral) {
		return;
	}

	public async create(creatorId: string) {
		let invite = {
			id: IdService.generate(),
			used: false,
			code: crypto.randomBytes(16).toString('hex'),
			creator: creatorId,
			createdAt: new Date().toISOString()
		};
	}
}

export default new UserService();
