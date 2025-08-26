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
  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">{location.name}</h2>
      <p className="mb-1">Type: {location.type}</p>
      <p className="mb-1">Dimension: {location.dimension}</p>
      <p className="mb-4">Created: {location.created}</p>
      <h3 className="font-semibold mb-2">Residents</h3>
      <ul className="flex flex-wrap gap-4 p-0">
        {location.residents.length === 0 ? (
          <li>No residents</li>
        ) : (
          location.residents.map((char) => (
            <li key={char.id} className="list-none text-center">
              <Link
                to={`/characters/${char.id}`}
                className="no-underline text-inherit"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="rounded-full mx-auto mb-2"
                />
                <div>{char.name}</div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
