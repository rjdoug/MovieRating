// Categories for ratings
// TODO: I don't like the fact that if a key changes or is added we need to update
// here and in the json an both are being used to access keys on different occasions
export const categories: (keyof Categories)[] = [
	'originality',
	'acting',
	'storyline',
	'pacing',
	'soundtrack',
	'replay',
	'cinematography',
	'emotionalImpact',
	'enjoyment'
];

// Creates an object that holds all the rating categories and sets them to 0 values
export function createEmptyRating(): Categories {
	return {
		originality: 0,
		acting: 0,
		cinematography: 0,
		emotionalImpact: 0,
		enjoyment: 0,
		pacing: 0,
		replay: 0,
		soundtrack: 0,
		storyline: 0
	};
}

export function calcOverallRating(weight: Weight, categoryRatings: Categories): number {
	// Initialize sum of weighted scores
	let weightedSum = 0;

	// Loop through selected categories
	for (const category of categories) {
		// Check if category exists in bot
		if (category in weight && category in categoryRatings) {
			weightedSum += weight[category] * categoryRatings[category];
		} else {
			console.error(`Invalid category: ${category}`);
		}
	}
	// Calculate total weight (sum of all weights)
	const totalWeight = Object.values(weight).reduce((acc, val) => acc + val, 0);

	// Divide weighted sum by total weight to get overall rating
	return weightedSum / totalWeight;
}
