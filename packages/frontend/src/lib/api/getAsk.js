import https from '$lib/https';

export default function getAsk(id) {
	return https.get(`/api/v1/ask/${id}`, true);
}
