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
		font-size: var(--font-size-text-large);
		color: var(--background-color);
		border-radius: 3px;
		padding: 16px 16px;
		background-color: var(--color-primary);
	}

	add-rating-button:hover {
		background-color: var(--color-primary-hover);
		cursor: pointer;
	}
</style>
