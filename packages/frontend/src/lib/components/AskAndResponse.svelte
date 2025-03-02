<script>
	let { data } = $props()
</script>

{#snippet inner()}
	<div class="question">
		<p>{data.content}</p>
		<i class="asker">- {data?.nickname ?? 'Anonymous'}</i>
	</div>
	<div class="response">
		<p>{data.response}</p>
	</div>
{/snippet}

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

<style lang="scss">
	.ask {
		display: flex;
		flex-direction: column;

		background: var(--bg-2);
		color: var(--tx-2);

		border-radius: 6px;
		overflow: clip;

		margin-bottom: 4px;
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
