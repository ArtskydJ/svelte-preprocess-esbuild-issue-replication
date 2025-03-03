<script lang='ts'>
	export let used
	// svelte-ignore export_let_unused
	export let unused
</script>

{used}

<!-- This warning does not get logged, which is expected behavior -->
<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
<div on:click={() => console.log(`clicked`)}>
	Click me
</div>

