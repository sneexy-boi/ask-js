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

<div class="form">
	<div class="inner wide">
		<input class="ipt" bind:value={cw} placeholder="Content warning" />

		<textarea class="ipt" bind:value={content} required placeholder="Question">
		</textarea>

		<input class="ipt" bind:value={nickname} placeholder="Nickname" />

		<div class="visAndSubmit">
			<div class="left">
				<select class="ipt" bind:value={visibility}>
					<option value="public">Public</option>
					<option value="public">Private</option>
				</select>
			</div>

			<button class={"btn" + (content.length > 0 ? " accent" : "")} onclick={() => submit()}>Send</button>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.visAndSubmit {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 5px;

		.left {
			flex-grow: 1;
		}
	}
</style>
