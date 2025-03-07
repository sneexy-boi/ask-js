<script>
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/lookupUser.js';
	import getAsk from '$lib/api/getAsk.js';
	import AskAndResponse from '$lib/components/AskAndResponse.svelte';
	import getUser from '$lib/api/getUser.js';
	import Avatar from '$lib/components/Avatar.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Error from '$lib/components/Error.svelte';
	import getInvites from '$lib/api/getInvites.js';
	import getAskReplies from '$lib/api/getAskReplies.js';
	import sendAsk from '$lib/api/sendAsk.js';
	import sendAskReply from '$lib/api/sendAskReply.js';
	import { IconTrash } from '@tabler/icons-svelte';
	import deleteAskReply from '$lib/api/deleteAskReply.js';
	import localStore from '$lib/localStore.js';

	let props = $props();
	console.log(props.data);

	let selfRaw = localStore.get("self");
	let selfParsed = undefined;

	try {
		selfParsed = JSON.parse(selfRaw);
	} catch { }

	let reply = $state("")

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

	const replyQuery = createInfiniteQuery({
		queryKey: ['ask_replies_'+($query?.data?.to ?? undefined)],
		retry: false,
		queryFn: async ({ pageParam }) => await getAskReplies(props.data.askid, pageParam),
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => {
			console.log(
				'['+'ask_replies_'+($query?.data?.to ?? undefined)+'] lastTlObj',
				lastPage?.at(-1).createdAt
			);
			return lastPage ? lastPage.at(-1).createdAt : undefined;
		}
	});

	async function submitReply() {
		await sendAskReply(props.data.askid, reply).then(() => {
			$replyQuery.refetch()
		})
	}

	async function deleteReply(id) {
		await deleteAskReply(props.data.askid, id).then(() => {
			$replyQuery.refetch()
		})
	}
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

	<AskAndResponse data={$query.data} detailed />

	<div class="replyBar" id="reply">
		<div class="form">
			<div class="inner wide wideGap oneLine">
				<input class="ipt tertiary" placeholder="Write your reply..." bind:value={reply} />
				<button class={"btn tertiary" + (reply.length > 0 ? " accent" : "")} onclick={() => submitReply()}>Reply</button>
			</div>
		</div>
	</div>

	{#if $replyQuery.isLoading}
		<Loading />
	{:else if $replyQuery.isError}
		<Error
			status={$replyQuery.error.status}
			message={$replyQuery.error.message}
			server={Boolean($replyQuery.error.status)}
			retry={() => $replyQuery.refetch()}
		/>
	{:else if $replyQuery.isSuccess}
		<div class="tl replies">
			{#each $replyQuery.data.pages as results}
				{#each results as data}
					<div class="object">
						<div class="inner">
							<div class="left">
								<Avatar user={data?.user} size={35} />
							</div>
							<div class="right">
								<a class="subtle" href={"/@"+data.user.username}>{data.user.displayName ?? data.user.username} (@{data.user.username})</a>
								<p>{data.content}</p>
							</div>
						</div>
						{#if selfParsed && (selfParsed?.admin || selfParsed?.id === data.user.id || $query.data.to === selfParsed?.id)}
						<div class="footer btnCtn">
								<button class="btn danger" onclick={() => deleteReply(data.id)}>
									<IconTrash size="18px" />
									Delete
								</button>
						</div>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
	{/if}
{/if}

<style lang="scss" scoped>
	.replyBar {
		margin-top: 10px;

		border-radius: 6px;
		padding: 10px;
		background: var(--bg-2);
	}

	.replies {
		margin-top: 10px;

		.object {
			display: flex;
			flex-direction: column;
			gap: 10px;

			border-radius: 6px;
			padding: 10px;
			background: var(--bg-2);

			.inner {
				display: flex;
				gap: 10px;

				.left, .right {
					display: flex;
					height: 100%;
				}

				.left {
					justify-content: flex-start;
				}

				.right {
					display: flex;
					flex-direction: column;
					align-items: flex-start;

					flex-grow: 1;
					gap: 5px;

					a {
						font-weight: bold;
					}
				}
			}

			.footer {
				margin-left: calc(35px + 10px)
			}
		}
	}

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
