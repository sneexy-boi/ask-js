import https from '$lib/https';

export default function sendAsk(to, cw, content, visibility, nickname) {
	return https.post(`/api/v1/ask`, {
		to: to,
		cw: cw,
		content: content,
		visibility: visibility,
		nickname: nickname
	});
}
