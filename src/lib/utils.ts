// Categories for ratings
// TODO: I don't like the fact that if a key changes or is added we need to update

import type { Categories, DB_Rating, DB_Weight, JSON_Category, Rating } from './types';

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

export function calcOverallRating(weight: DB_Weight, categoryRatings: Categories): number {
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

export function buildTMDBImgUrl(imgPath: string, width?: number) {
	width = width || 185;
	return `https://image.tmdb.org/t/p/w${width}` + imgPath;
}

async function getCategoryJSON() {
	const response = await fetch('$lib/data/ratings.json');
	const data = await response.json();

	// Type Assertion so the IDE doesn't cry - not happy about inference
	const categories: JSON_Category[] = data as JSON_Category[];

	// Loop through each category and validate properties
	for (const category of categories) {
		if (typeof category.id !== 'number' || category.id <= 0) {
			console.error(`Error: category.id must be a positive number (found: ${category.id})`);
		}
		if (typeof category.category !== 'string' || category.category.length === 0) {
			console.error(
				`Error: category.category must be a non-empty string (found: ${category.category})`
			);
		}
		// TODO: Add similar checks for other properties (key, description, weight, options)
	}

	return categories;
}

// Function to transform DB_Rating to Rating type with type assertion
// This is just so shit for optimization xD
export async function transformRating(dbRatings: DB_Rating[]): Promise<Rating[]> {
	const json_categories = await getCategoryJSON();
	const ratings: Rating[] = [];
	for (let r of dbRatings) {
		const rating: Rating = {
			userID: r.userID,
			movieID: r.movieID,
			date: r.date,
			originality: {
				label: json_categories.find((x) => x.key == 'originality')?.category || 'unknown',
				value: r.originality
			},
			acting: {
				label: json_categories.find((x) => x.key == 'acting')?.category || 'unknown',
				value: r.acting
			},
			storyline: {
				label: json_categories.find((x) => x.key == 'storyline')?.category || 'unknown',
				value: r.storyline
			},
			pacing: {
				label: json_categories.find((x) => x.key == 'pacing')?.category || 'unknown',
				value: r.pacing
			},
			soundtrack: {
				label: json_categories.find((x) => x.key == 'soundtrack')?.category || 'unknown',
				value: r.soundtrack
			},
			replay: {
				label: json_categories.find((x) => x.key == 'replay')?.category || 'unknown',
				value: r.replay
			},
			cinematography: {
				label: json_categories.find((x) => x.key == 'cinematography')?.category || 'unknown',
				value: r.cinematography
			},
			emotionalImpact: {
				label: json_categories.find((x) => x.key == 'emotionalImpact')?.category || 'unknown',
				value: r.emotionalImpact
			},
			enjoyment: {
				label: json_categories.find((x) => x.key == 'enjoyment')?.category || 'unknown',
				value: r.enjoyment
			},
			totalRating: {
				label: 'Total Rating',
				value: r.totalRating
			}
		};
		ratings.push(rating);
	}

	return ratings;
}
