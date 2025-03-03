<script lang='ts' generics='S extends string'>
	export let whatever
	// svelte-ignore export_let_unused
	export let my_string: S
</script>

{whatever}

<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
<div on:click={() => console.log(`clicked`)}>
	Click me
</div>

