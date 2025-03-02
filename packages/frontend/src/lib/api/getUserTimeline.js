import https from '$lib/https';

export default function getUserTimeline(id) {
	return https.get(`/api/v1/timeline/${id}`, false);
}
