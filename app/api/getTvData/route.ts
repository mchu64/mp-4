import { NextResponse } from "next/server";
import { TvShow, TmdbTvResult } from "@/app/interfaces/tv";


export const dynamic = "force-dynamic";

const API_KEY = process.env.API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export async function GET(): Promise<NextResponse> {

  // use fetch to get the data from the API
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=${encodeURIComponent(API_KEY || "")}`,
  );


  // if the response is not ok, return an error
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data from TMDB." },
      { status: 502 },
    );
  }

  if (res.status === 429) {
    return NextResponse.json(
      { error: "not enough credits to make the request" },
      { status: 429 },
    );
  }

  const data = (await res.json()) as { results: TmdbTvResult[] };
  const shows: TvShow[] = (data.results ?? []).slice(0, 10).map((item) => ({
    // limit it to 10 bc its top 10 rated
    id: item.id,
    name: item.name,
    overview: item.overview,
    voteAverage: Number(item.vote_average.toFixed(1)),
    firstAirDate: item.first_air_date, 
    posterUrl: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : null,
  }));

  return NextResponse.json({ shows });
}
