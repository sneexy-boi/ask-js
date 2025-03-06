<script>
	import { createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/lookupUser.js';
	import getAsk from '$lib/api/getAsk.js';
	import AskAndResponse from '$lib/components/AskAndResponse.svelte';
	import getUser from '$lib/api/getUser.js';
	import Avatar from '$lib/components/Avatar.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';

	let props = $props();
	console.log(props.data);

	const query = createQuery({
		queryKey: ['ask_'+props.data.askid],
		retry: false,
		queryFn: async () => await getAsk(props.data.askid)
	});

	const toQuery = createQuery({
		queryKey: ['ask_user_'+($query?.data?.to ?? undefined)],
		retry: false,
		queryFn: async () => await getUser($query?.data?.to ?? undefined),
	});
</script>

<svelte:head>
	{#if $query.isSuccess}
		{#if $toQuery.isSuccess}
			<title>"{$query.data.content.substring(0, 18)}{$query.data.content.length > 18 ? '...': ''}" - {($query.data?.nickname || $query.data.nickname?.length > 0) ? $query.data
				?.nickname : "Anonymous"}</title>
		{/if}
	{/if}
</svelte:head>

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
	<div class="to">
		{#if $toQuery.isLoading}
			<p>Loading ask recipient</p>
		{:else if $toQuery.isError}
			<p>Error loading ask recipient</p>
		{:else if $toQuery.isSuccess}
			<div class="left">
				<Avatar user={$toQuery.data} size={45} />
			</div>
			<div class="right">
				<p class="askedTo">Asked to</p>
				<a class="name" href={"/@"+$toQuery.data.username}>{$toQuery.data.displayName ?? $toQuery.data.username} <span>(@{$toQuery.data.username})</span></a>
			</div>
		{/if}
	</div>

	<AskAndResponse data={$query.data} />
{/if}

<style lang="scss" scoped>
	.to {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		gap: 10px;

		.left,.right {
			display: flex;
			flex-direction: column;
		}

		.right {
			.askedTo {
				color: var(--tx-3);
				font-size: 14px;
			}
			.name {
				font-size: 18px;
				font-weight: bold;
				color: var(--tx-2);
				text-decoration: none;

				&:hover {
					text-decoration: underline;
					text-decoration-color: var(--ac-1-50);
				}

				span {
					font-size: 14px;
					font-weight: normal;
				}
			}
		}
	}
</style>
