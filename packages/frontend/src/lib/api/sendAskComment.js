import https from '$lib/https';

export default function sendAskComment(id, content) {
	return https.post(`/api/v1/ask/${id}/comment`, {
		content: content
	});
}
