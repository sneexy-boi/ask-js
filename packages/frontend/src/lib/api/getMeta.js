import https from '$lib/https';

export default function getMeta() {
	return https.get(`/api/v1/meta`, true);
}
