<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	// Typecasting being a prick in svelte, so placing function here
	function onKeyUp(event: KeyboardEvent) {
		if (event.key == 'Enter') {
			goto(data.url.href + '/new');
		}
	}
</script>

<main>
	<!--  navigate to new -->
	<add-rating-button
		role="button"
		tabindex="0"
		on:keyup={onKeyUp}
		on:click={() => {
			goto(data.url.href + '/new');
		}}>Add Rating</add-rating-button
	>
</main>

<!-- List ratings -->

<style>
	main {
		display: flex;
		margin: 2rem;
		justify-content: center;
	}

	add-rating-button {
		border: 1px solid black;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		background-color: #cbd5f0;
	}

	add-rating-button:hover {
		background-color: #a0b0df;
		cursor: pointer;
	}
</style>
