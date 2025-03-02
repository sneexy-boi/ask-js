<script>
	import { createQuery } from '@tanstack/svelte-query';
	import getMyTimeline from '$lib/api/getMyTimeline.js';
	import AskAndResponse from '$lib/components/AskAndResponse.svelte';
	import localStore from '$lib/localStore.js';

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
	<p>Loading inbox asks</p>
{:else if $query.isError}
	<p>Error loading inbox asks</p>
{:else if $query.isSuccess}
	{#each $query.data as data}
		<AskAndResponse {data} onResponsePage={true} />
	{/each}
{/if}
