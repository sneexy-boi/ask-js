import https from '$lib/https';

export default function getMyTimeline(id) {
	return https.get(`/api/v1/timeline/${id}`, true);
}
