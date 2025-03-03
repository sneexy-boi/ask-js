<script>
	import { IconBox, IconCheckbox, IconPlus } from '@tabler/icons-svelte';
</script>

<div class="adminHeader">
	<div class="left">
		<h2>Users</h2>
	</div>
	<div class="right">
		<button class="btn nav">
			<IconCheckbox size="18px" />
			Select
		</button>
		<button class="btn nav accent">
			<IconPlus size="18px" />
			Create
		</button>
	</div>
</div>
