import crypto from 'crypto';

let counter = 0;

class IdService {
	public generate(): string {
		let id = '';

		const now = new Date();
		const nowNum = +now;

		id += nowNum.toString(36).padStart(8, '0');
		id += '0';
		id += crypto
			.randomBytes(4)
			.toString('base64url')
			.replaceAll('_', '0')
			.replaceAll('-', '1');
		id += counter.toString(36).padStart(4, '0').slice(-4);

		counter++;

		return id;
	}
}

export default new IdService();
