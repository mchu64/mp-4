export type TvShow = {
  id: number;
  name: string;
  overview: string;
  voteAverage: number;
  firstAirDate: string;
  posterUrl: string | null;
  // just in case poster is not available
};

// need this one bc of the poster_path from the TMDB response
export type TmdbTvResult = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  poster_path: string | null;
};