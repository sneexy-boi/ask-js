import https from '$lib/https';

export default function getUser(id) {
	return https.get(`/api/v1/user/${id}`, true);
}
