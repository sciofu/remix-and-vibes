// Removed Remix imports
import { useLoaderData, Link } from "react-router-dom";
import React from "react";

export async function loader({ params }: { params: { episodeId: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode/${params.episodeId}`
  );
  if (!res.ok) throw new Error("Not Found");
  const episode = await res.json();
  const characters = await Promise.all(
    episode.characters.map(async (url) => {
      const res = await fetch(url);
      if (!res.ok) return null;
      return await res.json();
    })
  );
  return { episode, characters: characters.filter(Boolean) };
}

export default function EpisodeDetail() {
  const { episode, characters } = useLoaderData();
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
          return (
            <div className="max-w-5xl mx-auto mt-10 p-4 md:p-8 bg-white rounded-xl shadow-lg animate-fade-in overflow-auto flex flex-col items-center" style={{ maxHeight: "90vh" }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 w-full max-w-full">
                <div className="min-w-0">
                  <h1 className="text-3xl font-bold mb-2 truncate">{episode.name}</h1>
                  <div className="mb-2 text-gray-500 text-lg font-mono truncate">{episode.episode}</div>
                  <div className="mb-4 text-gray-400 truncate">Air date: {episode.air_date}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mt-4 md:mt-0 max-w-xs w-full">
                  <h2 className="text-lg font-semibold mb-2 text-blue-700 truncate">Characters in this episode</h2>
                  <div>
                    <ul className="list-disc pl-4">
                      {characters.map((char) => (
                        <li key={char.id} className="truncate">
                          <Link to={`/characters/${char.id}`}>{char.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* ...rest of the component... */}
            </div>
          );
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
