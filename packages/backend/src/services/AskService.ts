import { ObjectLiteral } from 'typeorm';

class AskService {
	public async get(where: ObjectLiteral) {
		return;
	}

	public async getMany(where: ObjectLiteral) {
		return;
	}

	public async create(
		to: string,
		content: string,
		cw?: string,
		nickname?: string
	) {
		return;
	}
}

export default new AskService();
