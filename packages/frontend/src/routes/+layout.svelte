<script>
	import { page } from '$app/state';
	import { createQuery, QueryClientProvider } from '@tanstack/svelte-query';
	import queryClient from '$lib/queryClient.js';
	import localStore from '$lib/localStore.js';
	import Avatar from '$lib/components/Avatar.svelte';
	import { IconDashboard, IconInbox, IconLogout } from '@tabler/icons-svelte';
	import Tab from '$lib/components/Tab.svelte';

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
						<div class="btnCtn wideGap">
							<div class="btnCtn noGap">
								{#key page.url.pathname}
									{#if selfParsed.admin}
										<Tab collapsable href={"/admin"} selected={page.url.pathname.startsWith('/admin')}>
											<IconDashboard size="18px" />
											Admin
										</Tab>
									{/if}
									<Tab collapsable href={"/inbox"} selected={page.url.pathname === '/inbox'}>
										<IconInbox size="18px" />
										Inbox
									</Tab>
								{/key}
							</div>

							<Avatar user={selfParsed} />

							<a class="btn nav nobg danger" href={"/logout"}>
								<IconLogout size="18px" />
							</a>
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
			<div class="inner">
				<slot></slot>
			</div>
		</main>
	</div>
</QueryClientProvider>

<style lang="scss" global>
	@use '../app.scss';
</style>
