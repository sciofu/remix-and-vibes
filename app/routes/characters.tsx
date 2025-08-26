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
    <div>
      <h1>Rick and Morty Characters</h1>
      <Link to="/characters/new">Add New Character (local only)</Link>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <Link to={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
