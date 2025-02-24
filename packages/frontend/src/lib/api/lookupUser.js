import https from '$lib/https';

export default function lookupUser(username) {
	return https.get(`/api/v1/user/lookup/${username}`, true);
}
