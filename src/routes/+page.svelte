<script lang="ts">
	import { goto } from '$app/navigation';
	import SimpleButton from '$lib/SimpleButton.svelte';
	import MovieTable from '$lib/MovieTable.svelte';

	export let data;

	// Typecasting being a prick in svelte, so placing function here
	function onKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			goto(data.url?.href + '/new');
		}
	}
</script>

<h1>Ratings</h1>

<MovieTable data={{ movies: data.ratings, onSelectPath: 'ratings/*' }}>
	<empty-table>
		<h2>No Ratings</h2>
		<p>Add a new rating to get started</p>
	</empty-table>
</MovieTable>

<button-wrap>
	<SimpleButton onClick={() => goto(data.url?.href + 'ratings/new')} {onKeyUp}
		>Add Rating</SimpleButton
	>
</button-wrap>

<style>
	h1 {
		font-size: 3.5rem;
		font-weight: 600;
		font-size: var(--font-size-h1);
		margin-top: 1rem;
		color: var(--color-title-primary);
	}

	empty-table {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	button-wrap {
		display: flex;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
