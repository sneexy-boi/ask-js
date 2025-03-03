<script>
	import { createQuery } from '@tanstack/svelte-query';
	import getMeta from '$lib/api/getMeta.js';

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
	<p>Loading dashboard</p>
{:else if $query.isError}
	<p>Error loading dashboard</p>
{:else if $query.isSuccess}
	<div class="dash">
		<p><b>{$query.data?.stats?.users ?? 0}</b> users</p>
		<p><b>{$query.data?.stats?.asks ?? 0}</b> asks</p>
	</div>
{/if}

<style lang="scss" scoped>
	.dash {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
