<script>
	let { data } = $props()
</script>

<div class="ask">
	{#if data.cw}
		<details>
			<summary>{data.cw}</summary>
			<div class="question">
				<p>{data.content}</p>
				<i>- {data?.nickname ?? 'Anonymous'}</i>
			</div>
			<div class="response">
				<p>{data.response}</p>
			</div>
		</details>
	{:else}
		<div class="question">
			<p>{data.content}</p>
			<i>- {data?.nickname ?? 'Anonymous'}</i>
		</div>
		<div class="response">
			<p>{data.response}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.ask {
		display: flex;
		flex-direction: column;
		border: 1px solid gray;

		margin-bottom: 4px;
	}

	p {
		margin: 0;
	}

	.question, .response {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 6px;
	}

	.question {
		background: #00000020;
	}
</style>
