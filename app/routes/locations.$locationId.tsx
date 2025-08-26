import React from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";

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
  type Location = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    created: string;
    residents: any[];
  };
  const location = useLoaderData<Location>();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(false);
  }, [location]);
  return (
    <div className="p-4 h-full overflow-y-auto animate-fade-in">
      <h2 className="text-xl font-bold mb-2">{location.name}</h2>
      <p className="mb-1">Type: {location.type}</p>
      <p className="mb-1">Dimension: {location.dimension}</p>
      <p className="mb-4">Created: {location.created}</p>
      <h3 className="font-semibold mb-2">Residents</h3>
      <ul className="flex flex-wrap gap-4 p-0">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="list-none text-center animate-pulse">
              <div className="rounded-full mx-auto mb-2 bg-gray-300 w-16 h-16" />
              <div className="h-4 w-16 bg-gray-300 rounded mx-auto" />
            </li>
          ))
        ) : location.residents.length === 0 ? (
          <li>No residents</li>
        ) : (
          location.residents.map((char) => (
            <li
              key={char.id}
              className="list-none text-center transition-transform duration-300 hover:scale-105"
            >
              <Link
                to={`/characters/${char.id}`}
                className="no-underline text-inherit"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="rounded-full mx-auto mb-2 transition-all duration-500 hover:scale-110"
                />
                <div className="font-semibold mt-2 transition-colors duration-300 hover:text-blue-600">
                  {char.name}
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
