import Image from "next/image";
import { TvShow } from "@/app/interfaces/tv";

export default function TvShowCard(props: TvShow) {
  return (
    // use tailwind classes to style the card
    <article className="rounded-lg border border-black/10 bg-white p-4 shadow-sm dark:border-white/15 dark:bg-zinc-900">
      {props.posterUrl ? (
        <Image
          src={props.posterUrl}
          alt={`${props.name} poster`}
          className="mb-3 h-auto w-full rounded-md object-cover"
          width={500}
          height={750}
        />
      ) : null}

      <h2 className="text-lg font-semibold">{props.name}</h2>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {props.overview}
      </p>
      <p className="mt-3 text-sm">
        <span className="font-medium">Rating:</span> {props.voteAverage}
      </p>
      <p className="text-sm">
        <span className="font-medium">First Air Date:</span> {props.firstAirDate}
      </p>
    </article>
  );
}
