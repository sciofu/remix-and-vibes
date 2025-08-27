import React from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { Link } from "@remix-run/react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("newCharacter") as string;
  return json({ name });
}

export async function loader({ params }: { params: { locationId: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/location/${params.locationId}`
  );
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  const location = await res.json();

  // Fetch resident character data
  let residents: any[] = [];
  if (location.residents.length > 0) {
    residents = await Promise.all(
      location.residents.map(async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      })
    );
    residents = residents.filter(Boolean);
  }

  return json({ ...location, residents });
}

export default function LocationDetail() {
  const location = useLoaderData<Location>();

  const actionData = useActionData<typeof action>();
  const [loading, setLoading] = React.useState(true);
  const [residents, setResidents] = React.useState(location.residents);
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (!actionData) {
      setResidents(location.residents);
    }
  }, [location.residents]);

  React.useEffect(() => {
    setLoading(false);
  }, [location]);

  React.useEffect(() => {
    const data = actionData;
    if (data?.name) {
      const emojis = [
        "😀",
        "😎",
        "🦸",
        "🧑‍🚀",
        "🧑‍🎤",
        "🧑‍🔬",
        "🧑‍🍳",
        "🧑‍🏫",
        "🧑‍🌾",
        "🧑‍💻",
        "🧑‍🎨",
        "🧑‍🚒",
        "🧑‍⚕️",
        "🧑‍🔧",
        "🧑‍✈️",
        "🧑‍🏭",
        "🧑‍🦰",
        "🧑‍🦱",
        "🧑‍🦳",
        "🧑‍🦲",
        "🧑",
        "👩",
        "👨",
        "🧔",
        "👩‍🦰",
        "👨‍🦰",
        "👩‍🦱",
        "👨‍🦱",
        "👩‍🦳",
        "👨‍🦳",
        "👩‍🦲",
        "👨‍🦲",
      ];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      setResidents((prev) => [
        ...prev,
        {
          id: `new-${Date.now()}`,
          name: data.name,
          image: null,
          isNew: true,
          emoji,
        },
      ]);
    }

    inputRef.current.value = "";
  }, [actionData]);

  return (
    <div className="p-4 h-full overflow-y-auto animate-fade-in">
      <div className="flex items-center gap-6 mb-2">
        <h2 className="text-xl font-bold">{location.name}</h2>
        <Form method="post" className="flex items-center gap-2">
          <input
            type="text"
            name="newCharacter"
            placeholder="Character Name"
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
            required
            ref={inputRef}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </Form>
      </div>
      <div className="mb-1">Type: {location.type}</div>
      <div className="mb-1">Dimension: {location.dimension}</div>
      <div className="mb-4">Created: {location.created}</div>
      <h3 className="font-semibold mb-2">Residents</h3>
      <ul className="flex flex-wrap gap-4 p-0">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="list-none text-center animate-pulse">
              <div className="rounded-full mx-auto mb-2 bg-gray-300 w-16 h-16" />
              <div className="h-4 w-16 bg-gray-300 rounded mx-auto" />
            </li>
          ))
        ) : residents.length === 0 ? (
          <li>No residents</li>
        ) : (
          residents.map((char) => (
            <li
              key={char.id}
              className="list-none text-center transition-transform duration-300 hover:scale-105"
            >
              {char.isNew ? (
                <div className="rounded-full mx-auto mb-2 text-4xl">
                  {char.emoji || "🧑"}
                </div>
              ) : (
                <Link
                  to={`/characters/${char.id}`}
                  className="no-underline text-inherit"
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="rounded-full mx-auto mb-2 transition-all duration-500 hover:scale-110"
                  />
                </Link>
              )}
              <div className="font-semibold mt-2 transition-colors duration-300 hover:text-blue-600">
                {char.name}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  created: string;
  residents: any[];
};
