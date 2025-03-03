import https from '$lib/https';

export default function deleteInvite(id) {
	return https.delete(`/api/v1/admin/invite/${id}`);
}
