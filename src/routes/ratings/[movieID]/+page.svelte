<!-- NOTE: If you need to wrap the component, the wraps display needs to be flex, contents -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Poster from '$lib/Poster.svelte';
	import { userID } from '$lib/stores.js';
	import {
		buildTMDBImgUrl,
		categories,
		getRatingCategoryData as filterRatingByCategories
	} from '$lib/utils';
	import { error } from '@sveltejs/kit';
	import { Button } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { get } from 'svelte/store';

	export let data;

	let x = data.rating.totalRating;
	const ratingCategories = filterRatingByCategories(data.rating, categories);

	async function deleteRating() {
		const uid = get(userID);
		const res = await fetch(`/api/${uid}/ratings/${data.rating.movieID}`, {
			method: 'DELETE'
		});
		if (!res.ok) {
			console.error(res);
			error(res.status, {
				message: 'There was a problem deleting the rating.'
			});
		}
	}
</script>

<header>
	<h1>{data.rating.movie.title}</h1>
	<!-- <delete-button>
		<Button
			kind="danger-tertiary"
			iconDescription="Delete"
			icon={TrashCan}
			on:click={async () => {
				await deleteRating();
				console.log(data.url.host);
				goto('/');
			}}
		/>
	</delete-button> -->
</header>
<main>
	<poster-wrap>
		<Poster
			data={{
				movie: data.rating.movie,
				totalRating: data.rating.totalRating
			}}
		/>
	</poster-wrap>

	<rating-details>
		{#each Object.entries(ratingCategories) as [key, value]}
			<category-detail>
				<category-label>
					{value.label}
				</category-label>
				<category-value>
					{value.value}/5
				</category-value>
			</category-detail>
		{/each}
	</rating-details>
</main>

<style>
	header {
		position: relative;
		display: flex;
		width: 100%;
		align-items: flex-start;
	}

	delete-button {
		position: absolute;
		right: 10px;
		/* Center vertically */
		top: 50%;
		/* Account for button height */
		transform: translateY(-50%);
	}

	h1 {
		flex: 1;
		text-align: center;
	}
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 1rem;
	}

	poster-wrap {
		display: flex;
		justify-content: space-around;
		margin-bottom: 1rem;
	}

	rating-details {
		display: flex;
		flex-direction: column;
		flex: 3;
		gap: 0.7rem;
		padding: 0 1rem;
	}

	category-detail {
		display: flex;
		margin: 0 2rem;
		font-size: 1rem;
	}

	category-label {
		flex: 1;
	}
</style>
