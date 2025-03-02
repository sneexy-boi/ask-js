<script>
	let { userId } = $props()

	let username = $state("")
	let password = $state("")

	async function submit() {
	}
</script>

<div class="form centered">
	<div class="inner">
		<input class="ipt" bind:value={username} placeholder="Username" />
		<input class="ipt" bind:value={password} placeholder="Password" type="password" />
		<button class="btn" onclick={() => submit()}>Login</button>
	</div>
</div>
