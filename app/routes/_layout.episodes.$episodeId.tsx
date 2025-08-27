import { defer, json } from "@remix-run/node";
import { useLoaderData, Link, Await } from "@remix-run/react";
import { Suspense } from "react";
import React from "react";

export async function loader({ params }: { params: { episodeId: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode/${params.episodeId}`
  );
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  const episode = await res.json();
  // Defer character fetching with artificial delay
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const chars = await Promise.all(
    episode.characters.map(async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    })
  );

  const charactersPromise = new Promise(async (resolve) => {
    // await delay(3000);
    resolve(chars.filter(Boolean));
  });

  return defer({ episode, characters: charactersPromise });
}

export default function EpisodeDetail() {
  const { episode, characters } = useLoaderData<typeof loader>();
  return (
    <div
      className="max-w-5xl mx-auto mt-10 p-4 md:p-8 bg-white rounded-xl shadow-lg animate-fade-in overflow-auto flex flex-col items-center"
      style={{ maxHeight: "90vh" }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 w-full max-w-full">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold mb-2 truncate">{episode.name}</h1>
          <div className="mb-2 text-gray-500 text-lg font-mono truncate">
            {episode.episode}
          </div>
          <div className="mb-4 text-gray-400 truncate">
            Air date: {episode.air_date}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 mt-4 md:mt-0 max-w-xs w-full">
          <h2 className="text-lg font-semibold mb-2 text-blue-700 truncate">
            Characters in this episode
          </h2>
          <Suspense
            fallback={
              <div className="text-sm text-gray-600 animate-pulse">
                Loading characters...
              </div>
            }
          >
            <Await
              resolve={characters}
              errorElement={
                <div className="text-red-500">Failed to load characters.</div>
              }
            >
              {(chars: any[]) => (
                <div className="text-sm text-gray-600">
                  {chars.length} total
                </div>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Suspense
        fallback={
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <li
                key={i}
                className="bg-gray-100 rounded-lg p-4 flex flex-col items-center animate-pulse"
              >
                <div className="w-20 h-20 rounded-full mb-2 bg-gray-300" />
                <div className="font-semibold mt-2 text-center text-gray-400">
                  Loading...
                </div>
              </li>
            ))}
          </ul>
        }
      >
        <Await
          resolve={characters}
          errorElement={
            <div className="text-red-500">Failed to load characters.</div>
          }
        >
          {(chars: any[]) => (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {chars.length === 0 ? (
                <li>No characters</li>
              ) : (
                chars.map((char) => (
                  <li
                    key={char.id}
                    className="bg-gray-100 rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
                  >
                    <Link
                      to={`/characters/${char.id}`}
                      className="no-underline text-inherit"
                    >
                      <img
                        src={char.image}
                        alt={char.name}
                        className="w-20 h-20 rounded-full mb-2 shadow-md transition-all duration-500 hover:scale-110"
                      />
                      <div className="font-semibold mt-2 text-center transition-colors duration-300 hover:text-blue-600 truncate">
                        {char.name}
                      </div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
