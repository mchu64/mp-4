import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        Back to home
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">About</h1>
      <p className="mt-3 text-zinc-700 dark:text-zinc-300">
        This app shows the top 10 rated TV shows from TMDB API
      </p>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">
        The API key is only used in the server route, so it is not exposed in the browser
      </p>
    </main>
  );
}
