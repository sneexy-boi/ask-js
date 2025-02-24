import https from '$lib/https';

export default function lookupUser(id) {
	return https.get(`/api/v1/timeline/${id}`, true);
}
