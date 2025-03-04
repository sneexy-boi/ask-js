<script>
	import Https from '$lib/https.js';
	import localStore from '$lib/localStore.js';
	import { goto } from '$app/navigation';
	import { createQuery } from '@tanstack/svelte-query';
	import getMyTimeline from '$lib/api/getMyTimeline.js';
	import getMeta from '$lib/api/getMeta.js';

	let { userId } = $props()

	let okay = $state(false)
	let error = $state("")
	let success = $state("")

	let username = $state("")
	let password = $state("")
	let invite = $state("")

	async function submit() {
		await Https.post("/api/v1/auth/register", {
			username: username,
			password: password,
			invite: invite,
		}).then((e) => {
			if (e.token !== undefined) {
				okay = true
				localStore.set("token", e.token)
				localStore.set("self", JSON.stringify(e.user))

				goto("/").then(() => {
					location.reload()
				})
			} else {
				success = e.message ?? "No token returned, but no error occurred. Contact an admin.";
			}
		}).catch((err) => {
			error = err?.message ?? "Something went wrong"
		})
	}

	const metaQuery = createQuery({
		queryKey: ['meta'],
		retry: false,
		queryFn: async () => await getMeta()
	});
</script>

{#if $metaQuery.isLoading}
	<p>Loading instance information</p>
{:else if $metaQuery.isError}
	<p>Error loading instance information</p>
{:else if $metaQuery.isSuccess}
	<div class="form centered">
	<div class="inner">
		{#if !okay}
			{#if error.length > 0}
				<div class="error mb">
					<p>{error}</p>
				</div>
			{/if}
			{#if success.length > 0}
				<div class="success mb">
					<p>{success}</p>
				</div>
			{/if}

			{#if $metaQuery.data.registrations !== "closed"}
			<input class="ipt" bind:value={username} placeholder="Username" />
			<input class="ipt" bind:value={password} placeholder="Password" type="password" />

			{#if $metaQuery.data.registrations === "invite"}
				<input class="ipt" bind:value={invite} placeholder="Invite" />
			{/if}

			<button class="btn" onclick={() => submit()}>Register</button>

			{:else}
				<p>Registrations are closed</p>
			{/if}
		{:else}
			<p>Registered, redirecting...</p>
		{/if}
	</div>
</div>
{/if}
