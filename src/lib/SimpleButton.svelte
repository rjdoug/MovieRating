<script lang="ts">
	export let onKeyUp: ((event: KeyboardEvent) => void) | null;
	export let onClick: (() => void) | null;
	export let size: 'sm' | 'm';
</script>

<!--  navigate to new -->
<add-rating-button
	style={size == 'sm'
		? `border-radius: 5px;
padding: 12px 16px;
border-radius: 50px;`
		: ''}
	role="button"
	tabindex="0"
	on:keyup={onKeyUp}
	on:click={onClick}
>
	<slot />
</add-rating-button>

<style>
	add-rating-button {
		font-size: var(--font-size-text-large);
		color: var(--color-text-menu);
		border: 1px solid var(--color-button-border);
		border-radius: 10px;
		padding: 12px 16px;
		background-color: var(--color-button-background);
	}

	add-rating-button:hover {
		background-color: var(--color-button-background-hover);
		cursor: pointer;
	}
</style>
