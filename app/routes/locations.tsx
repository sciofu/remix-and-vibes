import { json } from "@remix-run/node";
import { Outlet, useLoaderData, Link, useFetcher } from "@remix-run/react";
import React from "react";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const res = await fetch(
    `https://rickandmortyapi.com/api/location?page=${page}`
  );
  const data = await res.json();
  return json(data.results);
}
export const View = () => {
  const initialLocations = useLoaderData<typeof loader>();
  const [locations, setLocations] = React.useState(initialLocations);
  const [page, setPage] = React.useState(1);
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.data && Array.isArray(fetcher.data)) {
      setLocations((prev) => [...prev, ...(fetcher.data as any[])]);
    }
  }, [fetcher.data]);

  const loadMore = () => {
    fetcher.load(`/locations?page=${page + 1}`);
    setPage((p) => p + 1);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: 300,
          borderRight: "1px solid #ccc",
          padding: 16,
          height: "100vh",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Locations</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            flex: 1,
            overflowY: "auto",
            margin: 0,
          }}
        >
          {locations.map((loc) => (
            <li key={loc.id} style={{ marginBottom: 8 }}>
              <Link to={String(loc.id)}>{loc.name}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={loadMore}
          disabled={fetcher.state === "loading"}
          style={{ marginTop: 16, width: "100%" }}
        >
          {fetcher.state === "loading" ? "Loading..." : "Load More"}
        </button>
      </aside>
      <main style={{ flex: 1, padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default View;
