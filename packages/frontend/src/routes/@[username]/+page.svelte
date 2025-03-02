<script>
	import { createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/lookupUser.js';
	import AskForm from '$lib/components/AskForm.svelte';
	import UserTimeline from '$lib/components/UserTimeline.svelte';

	let props = $props();
	console.log(props.data);

	const query = createQuery({
		queryKey: ['user_'+props.data.username],
		retry: false,
		queryFn: async () => await lookupUser(props.data.username)
	});
</script>

{#if $query.isLoading}
	<p>Loading @{props.data.username}</p>
{:else if $query.isError}
	<p>Error loading @{props.data.username}</p>
{:else if $query.isSuccess}
	<div>
		<div class="prompt">
			<div class="left">
				{#if $query.data?.avatar}
					<img class="avatar" src={$query.data?.avatar} />
				{/if}
			</div>
			<div class="right">
				<p>"{#if $query.data?.prompt}{$query.data?.prompt}{:else}<i>No prompt</i>{/if}"</p>
				<i class="username">- @{props.data.username}</i>
			</div>
		</div>

		<AskForm userId={$query.data.id} />

		<div class="timeline">
			<h2>Asks</h2>
			<UserTimeline userId={$query.data.id} />
		</div>
	</div>
{/if}

<style lang="scss" global>
	.prompt {
		display: flex;
		gap: 4px;

		margin-bottom: 20px;

		.left,.right {
			display: flex;
			flex-direction: column;
		}

		.right {
			padding: 8px 10px;
			background: var(--bg-2);
			color: var(--tx-2);
			border-radius: 6px;

			.username {
				color: var(--tx-3);
			}
		}
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 4px;

		margin-top: 20px;
	}
</style>
