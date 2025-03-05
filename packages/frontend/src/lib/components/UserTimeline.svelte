<script>
	import { createQuery } from '@tanstack/svelte-query';
	import getUserTimeline from '$lib/api/getUserTimeline.js';
	import AskAndResponse from '$lib/components/AskAndResponse.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';

	let { userId } = $props()

	const query = createQuery({
		queryKey: ['user_timeline'],
		retry: false,
		queryFn: async () => await getUserTimeline(userId)
	});
</script>

{#if $query.isLoading}
	<Loading />
{:else if $query.isError}
	<Error
		status={$query.error.status}
		message={$query.error.message}
		server={Boolean($query.error.status)}
		retry={() => $query.refetch()}
	/>
{:else if $query.isSuccess}
	<div class="tl">
		{#each $query.data as data}
			<AskAndResponse {data} />
		{/each}
	</div>
{/if}
