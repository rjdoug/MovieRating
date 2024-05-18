<script lang="ts">
	import { buildTMDBImgUrl, categories, getRatingCategoryData } from '$lib/utils';

	export let data;

	const ratingCategories = getRatingCategoryData(data.rating, categories);
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
					{value.label}
				</category-label>
				<category-value>
					{value.value}
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
