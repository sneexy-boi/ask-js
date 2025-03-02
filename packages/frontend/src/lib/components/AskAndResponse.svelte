<script>
	import Https from '$lib/https.js';
	import localStore from '$lib/localStore.js';
	import { goto } from '$app/navigation';

	let { data, onResponsePage = false } = $props()

	let response = $state("")
	let deleted = $state(false)

	async function deleteAsk() {
		await Https.delete("/api/v1/ask/" + data.id).then(() => {
			deleted = true;
		})
	}

	async function respond() {
		await Https.post("/api/v1/ask/" + data.id + "/respond", {
			response: response
		}).then(() => {
			data.response = response;
		})
	}
</script>

{#snippet inner()}
	<div class="question">
		<p>{data.content}</p>
		<br>
		<small class="time">{new Date(data.createdAt).toLocaleDateString()} at {new Date(data.createdAt).toLocaleTimeString()} {data.visibility === "private" ? "(Private)" : ""}</small>
		<i class="asker">- {data?.nickname || data?.nickname?.length > 0 ? data?.nickname : 'Anonymous'}</i>
	</div>
	<div class="response">
		{#if data.response}
			<p>{data.response}</p>
		{:else if onResponsePage}
			<input class="ipt tertiary" bind:value={response} placeholder="Write your response..." />
		{/if}
	</div>
	{#if onResponsePage}
		<div class="btnCtn padded">
			{#if !data.response}
				<button class="btn tertiary" onclick={() => respond()}>
					Respond
				</button>
			{/if}

			<div class="end">
				<button class="btn danger" onclick={() => deleteAsk()}>
					Delete
				</button>
			</div>
		</div>
	{/if}
{/snippet}

{#if !deleted}
<div class="ask">
	{#if data.cw}
		<details>
			<summary>{data.cw}</summary>
			{@render inner()}
		</details>
	{:else}
		{@render inner()}
	{/if}
</div>
{/if}

<style lang="scss">
	.ask {
		display: flex;
		flex-direction: column;

		background: var(--bg-2);
		color: var(--tx-2);

		border-radius: 6px;
		overflow: clip;

		margin-bottom: 10px;
	}

	p {
		margin: 0;
	}

	.question, .response {
		display: flex;
		flex-direction: column;
		gap: 4px;

		padding: 10px;
	}

	.question {
		background: var(--bg-3-75);

		.asker {
			color: var(--tx-3);
		}
	}
</style>
