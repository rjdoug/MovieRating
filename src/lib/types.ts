// combination of movie and rating as found in sql
export type MovieRating = {
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
	title: string;
	imdbLink: string;
	id: number;
};

// weight as found in db
// TODO: Update id to just be userID
export type Weight = {
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
	movieID?: number;
};
