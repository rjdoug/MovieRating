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

<header>
	<h1>Ratings</h1>
	<button-wrap>
		<SimpleButton size="sm" onClick={() => goto(data.url?.href + 'ratings/new')} {onKeyUp}
			>+</SimpleButton
		>
	</button-wrap>
</header>

<MovieTable data={{ movies: data.ratings, onSelectPathTemplate: 'ratings/*' }}>
	<empty-table>
		<h2>No Ratings</h2>
		<p>Add a new rating to get started</p>
	</empty-table>
</MovieTable>

<style>
	header {
		display: flex;
		width: 100%;
		padding: 0 12.5px;
		flex: 1;
		justify-content: space-between;
		margin-top: 1rem;
	}
	h1 {
		font-size: 3.5rem;
		font-weight: 600;
		font-size: var(--font-size-h1);
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
		align-items: center;
	}
</style>
