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
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={200} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin?.name}</p>
    </div>
  );
}
