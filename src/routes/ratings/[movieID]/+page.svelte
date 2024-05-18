<script lang="ts">
	import type { Categories, DB_Rating } from '$lib/types.js';
	import { buildTMDBImgUrl, categories } from '$lib/utils';

	export let data;
	export const getRatingSubset = (
		rating: DB_Rating,
		categories: (keyof Categories)[]
	): Partial<DB_Rating> => {
		const filteredRating: Partial<DB_Rating> = {};
		for (const category of categories) {
			if (category in rating) {
				filteredRating[category] = rating[category];
			}
		}
		return filteredRating;
	};

	const ratingCategories = getRatingSubset(data.rating, categories);
</script>

<h1>{data.rating.movie.title}</h1>
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
					{key}
				</category-label>
				<category-value>
					{value}
				</category-value>
			</category-detail>
		{/each}
	</rating-details>
</main>

<style>
	main {
		display: flex;
		width: 50%;
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
	}
</style>
