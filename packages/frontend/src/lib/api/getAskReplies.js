import https from '$lib/https';

export default function getAskReplies(id, since) {
	return https.get(
		`/api/v1/ask/${id}/replies` + (since ? '?since=' + since : ''),
		true
	);
}
