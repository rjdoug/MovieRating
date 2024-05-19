<script lang="ts">
	import { userID } from '$lib/stores.js';
	import { buildTMDBImgUrl, categories, getRatingCategoryData } from '$lib/utils';
	import { Button } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { get } from 'svelte/store';
	import { DELETE } from '../../api/[user]/ratings/[movieID]/+server.js';

	export let data;

	const ratingCategories = getRatingCategoryData(data.rating, categories);

	async function deleteRating() {
		const uid = get(userID);
		const res = await fetch(`/api/${uid}/ratings/${data.rating.movieID}`, {
			method: 'DELETE'
		});
		const msg = await res.json();
		console.log(msg);
	}
</script>

<header>
	<h1>{data.rating.movie.title}</h1>
	<delete-button>
		<Button
			kind="danger-tertiary"
			iconDescription="Delete"
			icon={TrashCan}
			on:click={async () => await deleteRating()}
		/>
	</delete-button>
</header>
<main>
	<movie-poster>
		<img
			class="poster-img"
			src={buildTMDBImgUrl(data.rating.movie.poster_path)}
			alt={data.rating.movie.title + ' poster'}
		/>
	</movie-poster>

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
		<total-rating>
			<total-label>
				{data.rating.totalRating.label}
			</total-label>
			<total-value>
				{data.rating.totalRating.value}/5
			</total-value>
		</total-rating>
	</rating-details>
</main>

<style>
	header {
		position: relative;
		display: flex;
		width: 100%;
		align-items: center;
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
		width: 40%;
		margin-top: 2rem;
	}
	movie-poster {
		display: flex;
		flex: 1;
	}
	img {
		height: 40vh;
		border-radius: 5px;
	}
	rating-details {
		display: flex;
		flex-direction: column;
		flex: 3;
		gap: 0.7rem;
	}

	category-detail {
		display: flex;
		margin: 0 2rem;
		font-size: 1rem;
	}

	category-label {
		flex: 1;
	}

	total-rating {
		display: flex;
		flex-direction: column;
		margin: auto;
		min-width: 2rem;
		width: 10rem;
		height: 5rem;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		border: 1px solid black;
		border-radius: 5px;
	}
</style>
