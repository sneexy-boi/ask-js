<script>
	import { fly, slide } from 'svelte/transition';

	let {
		selected = false,
		short = false,
		collapsable = false,
		href = ''
	} = $props();
</script>

{#if href}
	<a
		class={'btn tab' +
			(selected ? ' selected' : '') +
			(short ? ' short' : '') +
			(collapsable ? ' collapsable' : '')}
		{href}
	>
		<slot></slot>
		<span class="bar" in:slide|global={{ duration: 150, axis: 'x' }}></span>
	</a>
{:else}
	<button
		class={'btn tab' +
			(selected ? ' selected' : '') +
			(short ? ' short' : '') +
			(collapsable ? ' collapsable' : '')}
		on:click
	>
		<slot></slot>
		<span class="bar" in:slide|global={{ duration: 150, axis: 'x' }}></span>
	</button>
{/if}
