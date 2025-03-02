<script>
	import { page } from '$app/state';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import queryClient from '$lib/queryClient.js';
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
					<div class="btnCtn">
						<a class="btn accent" href="/login">
							Login
						</a>
						<a class="btn tertiary" href="/register">
							Register
						</a>
					</div>
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
