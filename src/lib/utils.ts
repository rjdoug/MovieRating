// Categories for ratings
const categories: (keyof Categories)[] = [
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

function calcOverallRating(weight: Weight, rating: Rating): number {
	// Check if user IDs match between Weight and Rating
	if (weight.userID !== rating.userID) {
		throw new Error('Weight and Rating user IDs must match');
	}

	// Initialize sum of weighted scores
	let weightedSum = 0;

	// Loop through selected categories
	for (const category of categories) {
		// Check if category exists in both
		if (category in weight && category in rating) {
			weightedSum += weight[category] * rating[category];
		} else {
			console.error(`Invalid category: ${category}`);
		}
	}

	// Calculate total weight (sum of all weights)
	const totalWeight = Object.values(weight).reduce((acc, val) => acc + val, 0);

	// Divide weighted sum by total weight to get overall rating
	return weightedSum / totalWeight;
}
