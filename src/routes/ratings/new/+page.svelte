<script lang="ts">
	export let data;

	let currentIndex = 0;
	let maxIndex = data.ratings.length - 1;
	let selectedIndex = 0;

	$: category = data.ratings[currentIndex];

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const selectedOption = formData.get('option') as string;
		if (currentIndex != maxIndex) currentIndex++;

		// reset options selection for next page
		selectedIndex = 0;
	}
</script>

<category-title>{category.category}</category-title>
<category-description>{category.description}</category-description>
<!-- <category-weight>{category.weight}</category-weight> -->

<category-rating>
	<form on:submit={handleSubmit}>
		<category-options>
			{#each category.options.reverse() as option, index}
				<label>
					<input
						type="radio"
						name="option"
						value={option.value}
						checked={index === selectedIndex}
						on:change={() => (selectedIndex = index)}
					/>
					{option.label}
				</label>
			{/each}
		</category-options>
		<button type="submit">Next</button>
	</form>
</category-rating>

<style>
	category-title {
		font-size: 3rem;
		font-weight: bold;
		margin: 1rem 0;
	}

	category-rating {
		min-width: 40%;
	}

	category-options {
		display: flex;
		flex-direction: column;
		margin: 2rem 0;
	}

	category-options > *:hover {
		background-color: #e4e4e4;
	}

	category-options > * {
		border: 1px solid rgb(202, 197, 197);
		padding: 1rem;
	}
</style>
