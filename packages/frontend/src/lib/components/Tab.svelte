<script>
	import {
		blur,
		crossfade,
		draw,
		fade,
		fly,
		scale,
		slide
	} from 'svelte/transition';

	let { selected = false, short = false, href = "" } = $props()
</script>

	{#if href}
		<a class={"btn tab" + (selected ? ' selected' : '') + (short ? ' short' : '')} href={href}>
			<slot></slot>
			<span class="bar" in:slide|global={{ duration: 150, axis: 'x' }}></span>
		</a>
	{:else}
		<button class={"btn tab" + (selected ? ' selected' : '') + (short ? ' short' : '')} on:click>
			<slot></slot>
			<span class="bar" in:slide|global={{ duration: 150, axis: 'x' }}></span>
		</button>
	{/if}
