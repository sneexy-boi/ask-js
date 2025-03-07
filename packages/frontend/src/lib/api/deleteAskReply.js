import https from '$lib/https';

export default function deleteAskReply(id, replyId) {
	return https.delete(`/api/v1/ask/${id}/reply/${replyId}`);
}
