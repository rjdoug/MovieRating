<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	// Typecasting being a prick in svelte, so placing function here
	function onKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			goto(data.url?.href + '/new');
		}
	}
</script>

<rating-table>
	{#if data.ratings}
		{#each data.ratings as rating}
			<rating-row>
				<rating-title>{rating.title}</rating-title>
				<rating-date>
					{new Date(rating.date).getDate()}/{new Date(rating.date).getMonth()}/{new Date(
						rating.date
					).getFullYear()}
				</rating-date>
				<rating-value
					>This is where you're up to. YOu should probably store the calcualted rating as well</rating-value
				>
			</rating-row>
		{/each}
	{/if}
</rating-table>

<!--  navigate to new -->
<add-rating-button
	role="button"
	tabindex="0"
	on:keyup={onKeyUp}
	on:click={() => {
		goto(data.url?.href + '/new');
	}}>Add Rating</add-rating-button
>

<!-- List ratings -->

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
