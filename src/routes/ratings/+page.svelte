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
				<rating-title>{rating.title}</rating-title>
				<rating-date>
					{new Date(rating.date).getDate()}/{new Date(rating.date).getMonth()}/{new Date(
						rating.date
					).getFullYear()}
				</rating-date>
				<rating-value>
					This is where you're up to. YOu should probably store the calculated rating as well
				</rating-value>
			</rating-row>
		{/each}
	{/if}
</rating-table>

<SimpleButton onClick={() => goto(data.url?.href + '/new')} {onKeyUp} />

<!-- List ratings -->

<style>
</style>
