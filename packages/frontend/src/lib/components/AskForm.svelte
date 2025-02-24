<script>
	import sendAsk from '$lib/api/sendAsk.js';

	let { userId } = $props()

	let cw = $state("")
	let content = $state("")
	let nickname = $state("")
	let visibility = $state("public")

	async function submit() {
		await sendAsk(userId, cw, content, visibility, nickname)

		cw = ""
		content = ""
		nickname = ""
		visibility = "public"
	}
</script>

<div class="askForm">
	<input bind:value={cw} placeholder="Content warning" />

	<textarea bind:value={content} required placeholder="Question">
	</textarea>

	<input bind:value={nickname} placeholder="Nickname" />

	<select bind:value={visibility}>
		<option value="public">Public</option>
		<option value="public">Private</option>
	</select>

	<button onclick={() => submit()}>Send</button>
</div>

<style lang="scss" scoped>
	.askForm {
		display: flex;
		flex-direction: column;
		gap: 4px;

		max-width: 450px;

		button {
			width: 100px;
		}
	}
</style>
