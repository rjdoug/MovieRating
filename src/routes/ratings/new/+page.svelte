<script lang="ts">
	import { calcOverallRating, createEmptyRating } from '$lib/utils.js';

	export let data;

	let currentIndex = 0;
	let maxIndex = data.ratings.length - 1;
	let selectedIndex = 0;

	// holds the rating for each category
	const ratings = createEmptyRating();

	//  json is problem
	$: category = data.ratings[currentIndex];

	function handleSubmit(event: Event) {
		try {
			event.preventDefault();
			const formData = new FormData(event.target as HTMLFormElement);
			const selectedOption = formData.get('option') as string;

			// store selected rating (option)
			// convert to lowercase or it creates a new field
			ratings[category.key as keyof Categories] = parseInt(selectedOption);

			if (currentIndex != maxIndex) currentIndex++;
			else {
				// TODO: check length of ratings is same as data.ratings. IF not then json keys are incorrect
				console.log(ratings);
				const overallRating = calcOverallRating(data.weights, ratings);
				console.log(overallRating);
			}

			// reset options selection for next page
			selectedIndex = 0;
		} catch (error: any) {
			console.error('submitting category ratings', error.message);
			throw error;
		}
	}
</script>

<category-title>{category.category}</category-title>
<category-description>{category.description}</category-description>
<!-- <category-weight>{category.weight}</category-weight> -->

<category-rating>
	<form on:submit={handleSubmit}>
		<category-options>
			{#each category.options as option, index}
				<label>
					<input
						type="radio"
						name="option"
						value={option.value}
						checked={index === selectedIndex}
						on:change={() => (selectedIndex = index)}
					/>
					{index + 1}.
					{option.label}
				</label>
			{/each}
		</category-options>
		<button type="submit">{maxIndex === currentIndex ? 'Finish' : 'Next'}</button>
	</form>
</category-rating>

<style>
	category-title {
		font-size: 3rem;
		font-weight: bold;
		margin: 1rem 0;
	}

	category-description {
		width: 40%;
		text-align: justify;
		text-align-last: center;
		line-height: 1.3rem;
		font-size: 1.1rem;
		font-style: italic;
	}

	category-rating {
		min-width: 40%;
	}

	category-options {
		display: flex;
		flex-direction: column;
		margin: 2rem 0;
	}

	category-options > label:hover {
		background-color: #e4e4e4;
	}

	category-options > label {
		border: 1px solid rgb(202, 197, 197);
		padding: 1rem;
		cursor: pointer;
	}

	category-options > label:not(:last-child) {
		border-bottom: none;
	}

	button {
		border: 1px solid #194f92;
		border-radius: 5px;
		color: #194f92;
		background-color: transparent;
		padding: 0.7rem 1rem;
		margin: 0;
		background-color: #cbd5f0;
		cursor: pointer;
		width: 100%;
	}

	button:hover {
		background-color: #a0b0df;
		cursor: pointer;
	}
</style>
