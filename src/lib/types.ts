// combination of movie and rating as found in sql
export interface MovieRating {
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
}

// weight as found in db
export interface Weight {
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
}

// Categories used to rate movies
export interface Categories {
	originality: number;
	acting: number;
	storyline: number;
	pacing: number;
	soundtrack: number;
	replay: number;
	cinematography: number;
	emotionalImpact: number;
	enjoyment: number;
}

export type PostRating = Categories & {
	userID: number;
	overallRating: number;
	movieID: number;
};
