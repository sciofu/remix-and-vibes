import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.characterId}`
  );
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  const character = await res.json();
  return json(character);
}

export default function CharacterDetail() {
  const character = useLoaderData<typeof loader>();

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg animate-fade-in flex flex-col items-center">
      <div className="relative group">
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 rounded-full shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
            character.status === "Alive"
              ? "bg-green-500 text-white"
              : character.status === "Dead"
              ? "bg-red-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {character.status}
        </span>
      </div>
      <h1 className="text-3xl font-bold mt-6 mb-2 text-center">
        {character.name}
      </h1>
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <span className="block text-xs text-gray-500 mb-1">Species</span>
          <span className="font-semibold text-lg">{character.species}</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <span className="block text-xs text-gray-500 mb-1">Gender</span>
          <span className="font-semibold text-lg">{character.gender}</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 text-center col-span-2">
          <span className="block text-xs text-gray-500 mb-1">Origin</span>
          <span className="font-semibold text-lg">
            {character.origin?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
