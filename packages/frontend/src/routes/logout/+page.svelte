<script>
	import localStore from '$lib/localStore.js';
	import { goto } from '$app/navigation';

	localStore.set("token", "")
	localStore.set("self", "")

	goto("/").then(() => {
		location.reload()
	})
</script>

<p>Logged out, redirecting...</p>
