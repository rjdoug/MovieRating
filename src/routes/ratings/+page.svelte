<script lang="ts">
	import { goto } from '$app/navigation';
	import SimpleButton from '$lib/SimpleButton.svelte';

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
				<rating-title>{rating.movie.title}</rating-title>
				<rating-date>
					{new Date(rating.date).getDate()}/{new Date(rating.date).getMonth()}/{new Date(
						rating.date
					).getFullYear()}
				</rating-date>
				<rating-value>
					Make this into a grid like the other page and have the ratings over top with the spotify
					grey out bs
				</rating-value>
			</rating-row>
		{/each}
	{/if}
</rating-table>

<SimpleButton onClick={() => goto(data.url?.href + '/new')} {onKeyUp}>New Rating</SimpleButton>

<style>
</style>
