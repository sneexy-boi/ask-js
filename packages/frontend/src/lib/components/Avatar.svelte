<script>
	let { user, size = 35 } = $props()
</script>

<a href={"/@"+user.username}>
	{#if user.avatar}
		<img class="avatar" src={user.avatar} style={"height:"+size+"px;width:"+size+"px;"} />
	{:else}
		<div class="avatar" style={"height:"+size+"px;width:"+size+"px;font-size:"+size/3+"px;"}>
			{(user.displayName ?? user.username).charAt(0)}
		</div>
	{/if}
</a>

<style lang="scss" scoped>
	a {
		cursor: pointer;
		text-decoration: none;

		.avatar {
			display: flex;
			align-items: center;
			justify-content: center;

			border-radius: 6px;
			background: var(--bg-3);

			color: var(--tx-3);
			user-select: none;
		}
	}
</style>
