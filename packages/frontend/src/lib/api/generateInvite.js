import https from '$lib/https';

export default function generateInvite() {
	return https.post(`/api/v1/admin/invite`, {});
}
