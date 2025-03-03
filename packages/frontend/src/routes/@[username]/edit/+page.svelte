<script>
	import { page } from '$app/state';
	import { createQuery } from '@tanstack/svelte-query';
	import lookupUser from '$lib/api/lookupUser.js';
	import Https from '$lib/https.js';
	import localStore from '$lib/localStore.js';
	import { goto } from '$app/navigation';

	let username = $state(page.params?.username);

	let error = $state("")
	let values = $state({
		avatar: undefined,
		displayName: undefined,
		prompt: undefined
	})

	const query = createQuery({
		queryKey: ['user_'+username],
		retry: false,
		queryFn: async () => await lookupUser(username)
	});

	function updateValue() {
		values = $query.data;
	}

	updateValue()

	async function submit() {
		console.log($query.data)

		await Https.patch("/api/v1/user/"+$query.data.id, values).catch((err) => {
			error = err?.message ?? "Something went wrong"
		})

		await $query.refetch().then(() => {
			updateValue()
		})
	}
</script>

{#if $query.isLoading}
	<p>Loading @{username}</p>
{:else if $query.isError}
	<p>Error loading @{username}</p>
{:else if $query.isSuccess}
	<div class="form">
		<div class="inner wide">
			<p class="title">Editing @{$query.data.username}'s profile</p>

			{#if error.length > 0}
				<div class="error">
					<p>{error}</p>
				</div>
			{/if}

			<label for="user_edit_avatar">Avatar</label>
			<input class="ipt" id="user_edit_avatar" placeholder="https://example.com/files/cool_image.png" bind:value={values.avatar} />

			<label for="user_edit_displayName">Display name</label>
			<input class="ipt" id="user_edit_displayName" placeholder="cool and awesome" bind:value={values.displayName} />

			<label for="user_edit_prompt">Prompt</label>
			<textarea class="ipt" id="user_edit_prompt" placeholder="Ask me anything!" bind:value={values.prompt}></textarea>

			<button class={"btn"} onclick={() => submit()}>Submit</button>
		</div>
	</div>
{/if}

<style lang="scss" global>
</style>
