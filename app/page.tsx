"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TvShowCard from "@/app/components/tvShowCard";
import { TvShow } from "@/app/interfaces/tv";

type TvApiResponse = {
  shows: TvShow[];
};

export default function Home() {
  const [data, setData] = useState<TvApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadShows() {
      try {
        const response = await fetch("/api/getTvData");
        const payload = (await response.json()) as TvApiResponse & { error?: string };

        if (cancelled) return;

        if (!response.ok) {
          setError("Failed to load TV data.");
          setData(payload);
          setIsLoading(false);
          return;
        }

        setData(payload);
        setIsLoading(false);
      } catch {
        if (cancelled) return;
        setError("Failed to load TV data.");
        setIsLoading(false);
      }
    }

    void loadShows();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Live Top 10 Rated TV Shows using TMDB API (its free :D)</h1>
      <Link href="/about" className="mt-2 inline-block text-sm text-blue-600 hover:underline">
        About this project
      </Link>

      {isLoading ? <p className="mt-6">Loading...</p> : null}

      {error ? (
        <p className="mt-6 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </p>
        // there is a hydration error here , but it still wokrs?
      ) : null}

      {data && "shows" in data ? (
        <section className="mt-6 grid grid-cols-1 gap-4">
          {data.shows.map((show) => (
            <TvShowCard key={show.id} {...show} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
