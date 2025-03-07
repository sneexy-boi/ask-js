import https from '$lib/https';

export default function getAskComments(id, since) {
	return https.get(
		`/api/v1/ask/${id}/comments` + (since ? '?since=' + since : ''),
		true
	);
}
