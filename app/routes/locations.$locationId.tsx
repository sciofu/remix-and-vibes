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
    <div>
      <h2>{location.name}</h2>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <p>Created: {location.created}</p>
      <h3>Residents</h3>
      <ul
        style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: 0 }}
      >
        {location.residents.length === 0 ? (
          <li>No residents</li>
        ) : (
          location.residents.map((char) => (
            <li
              key={char.id}
              style={{ listStyle: "none", textAlign: "center" }}
            >
              <Link
                to={`/characters/${char.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={char.image}
                  alt={char.name}
                  width={80}
                  height={80}
                  style={{ borderRadius: "50%" }}
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
