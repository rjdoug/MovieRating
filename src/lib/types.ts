interface Rating {
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

interface Weight {
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

interface Categories {
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
