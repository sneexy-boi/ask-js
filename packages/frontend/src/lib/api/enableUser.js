import https from '$lib/https';

export default function enableUser(id) {
	return https.post(`/api/v1/admin/user/${id}/enable`, {});
}
