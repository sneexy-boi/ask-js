<script>
	import { createQuery } from '@tanstack/svelte-query';
	import getMeta from '$lib/api/getMeta.js';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';

	const query = createQuery({
		queryKey: ['meta'],
		retry: false,
		queryFn: async () => await getMeta()
	});
</script>

<div class="adminHeader">
	<div class="left">
		<h2>Dashboard</h2>
	</div>
</div>

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
	<div class="dash">
		<p><b>{$query.data?.stats?.users ?? 0}</b> users</p>
		<p><b>{$query.data?.stats?.asks ?? 0}</b> asks</p>
		<p><b>{$query.data?.stats?.responses ?? 0}</b> responses</p>
		<p><b>{$query.data?.stats?.comments ?? 0}</b> comments</p>
	</div>
{/if}

<style lang="scss" scoped>
	.dash {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
