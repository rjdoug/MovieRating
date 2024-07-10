export type JSON_Category = {
	id: number;
	// Defines the category in a displayable fashion
	category: string;
	// key to be used in objects - unique
	key: string;
	// Prompt to help users understand what the category is about
	description: string;
	// The weighting of the category when the total is calculated
	// TODO: remove once weights have been implemented in the database
	weight: number;
	options: {
		label: string;
		value: number;
	}[];
};

// combination of movie and rating as found in sql
// Holds a label and value. Ideally would build type from the json file before ts is compiled, but happy to duplicate for now
export type DB_Rating = {
	userID: number;
	movieID: number;
	date: Date;
	originality: number;
	acting: number;
	storyline: number;
	pacing: number;
	soundtrack: number;
	replay: number;
	cinematography: number;
	emotionalImpact: number;
	enjoyment: number;
	totalRating: number;
};

export type KeyVal = {
	label: string;
	value: any;
};

export type Rating = {
	userID: number;
	movieID: number;
	date: Date;
	originality: KeyVal;
	acting: KeyVal;
	storyline: KeyVal;
	pacing: KeyVal;
	soundtrack: KeyVal;
	replay: KeyVal;
	cinematography: KeyVal;
	emotionalImpact: KeyVal;
	enjoyment: KeyVal;
	totalRating: KeyVal;
};

// weight as found in db
// TODO: Update id to just be userID
export type DB_Weight = {
	id: number;
	userID: number;
	originality: number;
	acting: number;
	storyline: number;
	pacing: number;
	soundtrack: number;
	replay: number;
	cinematography: number;
	emotionalImpact: number;
	enjoyment: number;
};

// type RatingLabel = "Originality" | "Acting" | "Storyline" |

// Categories used to rate movies
// TODO: Categories could probably dissapear and be replaced with strings or something
export type Categories = {
	originality: number;
	acting: number;
	storyline: number;
	pacing: number;
	soundtrack: number;
	replay: number;
	cinematography: number;
	emotionalImpact: number;
	enjoyment: number;
};

// TODO: With Categories gone, we could use Movie Rating and drop a couple fields
export type PostRating = Categories & {
	userID?: number;
	overallRating: number;
	movieID: number;
};

// Combination of Rating and TMDB movie. Useful when displaying rating data
export type RatingAndMovie = Rating & {
	movie: TMDBMovie;
};

// Object returned when requesting a list of movies from TMDB
export type TMDBMovieList = {
	page: number;
	results: TMDBMovie[];
	total_pages: number;
	total_results: number;
};

// Object returned from TMDB when requesting a movie
export type TMDBMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};
