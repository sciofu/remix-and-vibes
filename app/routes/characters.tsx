import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await fetch("https://rickandmortyapi.com/api/character?page=1");
  const data = await res.json();
  return json(data.results);
}

export default function Characters() {
  const characters = useLoaderData<typeof loader>();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Characters</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <li
            key={char.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <Link to={String(char.id)} className="hover:text-blue-600">
              <img
                src={char.image}
                alt={char.name}
                className="w-24 h-24 rounded-full mb-2"
              />
              <span>{char.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
