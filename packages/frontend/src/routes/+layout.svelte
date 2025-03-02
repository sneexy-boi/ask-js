<script>
	import { page } from '$app/state';
	import { createQuery, QueryClientProvider } from '@tanstack/svelte-query';
	import queryClient from '$lib/queryClient.js';
	import localStore from '$lib/localStore.js';

	let selfRaw = localStore.get("self");
	let selfParsed = undefined;

	try {
		selfParsed = JSON.parse(selfRaw);
	} catch { }
</script>

<QueryClientProvider client={queryClient}>
	<div class="page">
		<header>
			<div class="inner">
				<div class="left">
					<a class="subtle" href="/">
						{page.url.host}
					</a>
				</div>
				<div class="right">
					{#if selfParsed}
						<div class="btnCtn">
							{#if selfParsed.admin}
								<a class="btn nav" href={"/admin"}>Admin</a>
							{/if}
							<a class="btn nav" href="/inbox">Inbox</a>
							<a class="btn nav" href={"/@"+selfParsed.username}>My Page</a>
							<a class="btn danger" href={"/logout"}>Logout</a>
						</div>
					{:else}
						<div class="btnCtn">
							<a class="btn accent" href="/login">
								Login
							</a>
								<a class="btn nav" href="/register">
									Register
								</a>
						</div>
					{/if}
				</div>
			</div>
		</header>
		<main>
			<slot></slot>
		</main>
	</div>
</QueryClientProvider>

<style lang="scss" global>
	@use '../app.scss';
</style>
