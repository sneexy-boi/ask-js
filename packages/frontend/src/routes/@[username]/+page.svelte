<script>
	import { createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/lookupUser.js';
	import AskForm from '$lib/components/AskForm.svelte';

	let props = $props();
	console.log(props.data);

	const query = createQuery({
		queryKey: ['user'],
		retry: false,
		queryFn: async () => await lookupUser(props.data.username)
	});
</script>

{#if $query.isLoading}
	<p>Loading @{props.data.username}</p>
{:else if $query.isError}
	<p>Error loading @{props.data.username}</p>
{:else if $query.isSuccess}
	<h1>@{props.data.username}</h1>
	<p>"{#if $query.data?.prompt}{$query.data?.prompt}{:else}<i>No prompt</i>{/if}"</p>

	<AskForm userId={$query.data.id} />
{/if}
