import { ObjectLiteral } from 'typeorm';
import AskService from './AskService.js';

class TimelineService {
	public async get(
		type: string,
		where: ObjectLiteral,
		order: string,
		take: number
	) {
		let timelineObjects;

		if (type === 'ask')
			timelineObjects = await AskService.getMany(where, order, take);

		return this.sort(timelineObjects, take);
	}

	public sort(timeline: ObjectLiteral[], take: number) {
		timeline.sort(
			(x, y) =>
				Number(new Date(y.createdAt)) - Number(new Date(x.createdAt))
		);

		if (timeline.length > take) {
			timeline.length = take;
		}

		return timeline;
	}
}

export default new TimelineService();
