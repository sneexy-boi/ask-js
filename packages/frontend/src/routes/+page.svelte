<script>
	import { createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/lookupUser.js';
	import getAllUsers from '$lib/api/getAllUsers.js';

	const query = createQuery({
		queryKey: ['userlist'],
		retry: false,
		queryFn: async () => await getAllUsers()
	});
</script>

<p>User directory</p>

{#if $query.isLoading}
	<p>Loading user list</p>
{:else if $query.isError}
	<p>Error loading user list</p>
{:else if $query.isSuccess}
	<ul>
		{#each $query.data as user}
			<li>
				<a href={"/@"+user.username}>{user.username}</a>
			</li>
		{/each}
	</ul>
{/if}
