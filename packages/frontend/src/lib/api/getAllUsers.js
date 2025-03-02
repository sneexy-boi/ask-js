import https from '$lib/https';

export default function getAllUsers() {
	return https.get(`/api/v1/users`, false);
}
