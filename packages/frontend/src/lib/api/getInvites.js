import https from '$lib/https';

export default async function getInvites(since) {
	return await https.get(
		'/api/v1/admin/invites' + (since ? '?since=' + since : ''),
		true
	);
}
