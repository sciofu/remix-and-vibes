import React from "react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await fetch("https://rickandmortyapi.com/api/character?page=1");
  const data = await res.json();
  return json(data.results);
}

export default function Characters() {
  const characters = useLoaderData<typeof loader>();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(false);
  }, [characters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <li
                key={i}
                className="bg-gray-200 animate-pulse rounded shadow p-4 flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full mb-2 bg-gray-300" />
                <span className="h-4 w-16 bg-gray-300 rounded" />
              </li>
            ))
          : characters.map((char) => (
              <li
                key={char.id}
                className="bg-white rounded shadow p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link to={String(char.id)} className="hover:text-blue-600">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-24 h-24 rounded-full mb-2 transition-all duration-500 hover:scale-110"
                  />
                  <span className="font-semibold text-lg mt-2 transition-colors duration-300 hover:text-blue-600">
                    {char.name}
                  </span>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
