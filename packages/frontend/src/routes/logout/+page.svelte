<script>
	import localStore from '$lib/localStore.js';
	import { goto } from '$app/navigation';

	localStore.set('token', '');
	localStore.set('self', '');

	goto('/').then(() => {
		location.reload();
	});
</script>

<svelte:head>
	<title>Logging out...</title>
</svelte:head>

<p>Logged out, redirecting...</p>
