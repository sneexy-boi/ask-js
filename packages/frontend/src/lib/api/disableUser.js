import https from '$lib/https';

export default function disableUser(id) {
	return https.post(`/api/v1/admin/user/${id}/disable`, {});
}
