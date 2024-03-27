<script lang="ts">
	export let onKeyUp: ((event: KeyboardEvent) => void) | null;
	export let onClick: (() => void) | null;
</script>

<!--  navigate to new -->
<add-rating-button role="button" tabindex="0" on:keyup={onKeyUp} on:click={onClick}>
	<slot />
</add-rating-button>

<style>
	add-rating-button {
		border: 1px solid #194f92;
		color: #194f92;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		background-color: #cbd5f0;
	}

	add-rating-button:hover {
		background-color: #a0b0df;
		cursor: pointer;
	}
</style>
