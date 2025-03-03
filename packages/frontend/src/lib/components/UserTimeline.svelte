<script>
	import { createQuery } from '@tanstack/svelte-query';
	import getUserTimeline from '$lib/api/getUserTimeline.js';
	import AskAndResponse from '$lib/components/AskAndResponse.svelte';

	let { userId } = $props()

	const query = createQuery({
		queryKey: ['user_timeline'],
		retry: false,
		queryFn: async () => await getUserTimeline(userId)
	});
</script>

{#if $query.isLoading}
	<p>Loading asks</p>
{:else if $query.isError}
	<p>Error loading asks</p>
{:else if $query.isSuccess}
	<div class="tl">
		{#each $query.data as data}
			<AskAndResponse {data} />
		{/each}
	</div>
{/if}
