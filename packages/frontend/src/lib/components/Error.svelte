<script lang="ts">
	import { IconReload } from '@tabler/icons-svelte';

	let { status = 0, message = '', server = false, retry } = $props();
</script>

<div class="apiError">
	{#if server}
		<h1>{status}</h1>
	{:else}
		<h1>Uh oh!</h1>
	{/if}
	<p>{message}</p>

	{#if retry}
		<button class="btn" onclick={retry}>
			Retry
		</button>
	{/if}
</div>

<style lang="scss" scoped>
	.apiError {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;

		height: 100%;
		width: 100%;

		margin: 20px 0;

		h1 {
			margin-bottom: 5px;
		}

		p {
			font-size: 16px;
			line-height: 1;
		}
	}
</style>
