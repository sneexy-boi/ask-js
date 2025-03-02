<script>
	import Https from '$lib/https.js';
	import localStore from '$lib/localStore.js';
	import { goto } from '$app/navigation';

	let { userId } = $props()

	let okay = $state(false)

	let username = $state("")
	let password = $state("")

	async function submit() {
		await Https.post("/api/v1/auth/login", {
			username: username,
			password: password,
		}).then((e) => {
			if (e.token !== undefined) {
				okay = true
				localStore.set("token", e.token)
				localStore.set("self", JSON.stringify(e.user))

				goto("/").then(() => {
					location.reload()
				})
			}
		})
	}
</script>

<div class="form centered">
	<div class="inner">
		{#if !okay}
			<input class="ipt" bind:value={username} placeholder="Username" />
			<input class="ipt" bind:value={password} placeholder="Password" type="password" />
			<button class="btn" onclick={() => submit()}>Login</button>
		{:else}
			<p>Logged in, redirecting...</p>
		{/if}
	</div>
</div>
