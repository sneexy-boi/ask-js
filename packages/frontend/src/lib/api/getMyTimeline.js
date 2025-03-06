import https from '$lib/https';

export default function getMyTimeline(id, since) {
	return https.get(
		`/api/v1/timeline/${id}` + (since ? '?since=' + since : ''),
		true
	);
}
