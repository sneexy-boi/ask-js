<script>
	import { page } from '$app/state';
	import Https from '$lib/https.js';
	import { IconCopy, IconLock, IconTrash, IconWorld } from '@tabler/icons-svelte';

	let { data, onResponsePage = false } = $props()

	let response = $state("")
	let deleted = $state(false)

	function copyAsk() {
		navigator.clipboard.writeText(`> ${data.content}

${data.response}

${page.url.protocol + "//" + page.url.host + "/ask/" + data.id}`)
	}

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
		<small class="time"><a href={"/ask/"+data.id}>{new Date(data.createdAt).toLocaleDateString()} at {new Date(data.createdAt).toLocaleTimeString()}</a> {#if data.visibility === "private"}<IconLock size="16px" />{:else}<IconWorld size="16px" />{/if}</small>
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
				<button class="btn tertiary" onclick={() => copyAsk()}>
					<IconCopy size="18px" />
					Copy
				</button>
				<button class="btn danger" onclick={() => deleteAsk()}>
					<IconTrash size="18px" />
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
	}

	summary {
		background: var(--bg-3);
		padding: 8px 12px;
		font-size: 14px;
	}

	details:first-of-type summary::marker,
	:is(::-webkit-details-marker) {
		content: "+ ";
		font-weight: 700;
		// same width
		font-family: monospace;

	}
	details[open]:first-of-type summary::marker {
		content: "- ";
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

		small {
			display: flex;
			align-items: center;
			gap: 5px;

			a {
				color: var(--tx-3);
				text-decoration: none;
				font-size: inherit;

				&:hover {
					text-decoration: underline;
					text-decoration-color: var(--ac-1-50);
				}
			}
		}
	}
</style>
