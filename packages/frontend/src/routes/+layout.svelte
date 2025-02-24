<script>
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import queryClient from '$lib/queryClient.js';
</script>

<QueryClientProvider client={queryClient}>
	<main>
		<slot></slot>
	</main>
</QueryClientProvider>

<style lang="scss" global>
	@use '../app.scss';
</style>
