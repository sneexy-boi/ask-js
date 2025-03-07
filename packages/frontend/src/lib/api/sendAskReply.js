import https from '$lib/https';

export default function sendAskReply(id, content) {
	return https.post(`/api/v1/ask/${id}/reply`, {
		content: content
	});
}
