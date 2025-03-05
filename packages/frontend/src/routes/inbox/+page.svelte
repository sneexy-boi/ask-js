<script>
	import { createQuery } from '@tanstack/svelte-query';
	import getMyTimeline from '$lib/api/getMyTimeline.js';
	import AskAndResponse from '$lib/components/AskAndResponse.svelte';
	import localStore from '$lib/localStore.js';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';

	let selfRaw = localStore.get("self");
	let selfParsed = undefined;

	try {
		selfParsed = JSON.parse(selfRaw);
	} catch { }

	const query = createQuery({
		queryKey: ['user_inbox'],
		retry: false,
		queryFn: async () => await getMyTimeline(selfParsed ? selfParsed?.id : "")
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
			<AskAndResponse {data} onResponsePage={true} />
		{/each}
	</div>
{/if}
