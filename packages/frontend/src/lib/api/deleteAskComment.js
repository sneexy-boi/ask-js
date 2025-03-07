import https from '$lib/https';

export default function deleteAskComment(id, commentId) {
	return https.delete(`/api/v1/ask/${id}/comment/${commentId}`);
}
