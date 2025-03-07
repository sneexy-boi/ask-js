import { ObjectLiteral } from 'typeorm';
import db from '../../utils/db.js';

class AskBuilder {
	public async build(object: ObjectLiteral) {
		object['replyCount'] = await db.getRepository('reply').count({
			where: {
				replyingToId: object.id
			}
		});

		return object;
	}

	public async buildMany(objects: ObjectLiteral[]) {
		let built: ObjectLiteral[] = [];

		for (const object of objects) {
			await this.build(object).then((e) => {
				if (e) built.push(e);
			});
		}

		return built;
	}
}

export default new AskBuilder();
