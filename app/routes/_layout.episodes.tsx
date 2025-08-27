import { json } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import React from "react";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode?page=${page}`
  );
  const data = await res.json();
  return data.results;
}

export const View = () => {
  const initialEpisodes = useLoaderData<typeof loader>();
  const [episodes, setEpisodes] = React.useState(initialEpisodes);
  const [page, setPage] = React.useState(1);
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.data && Array.isArray(fetcher.data)) {
      setEpisodes((prev) => [...prev, ...(fetcher.data as any[])]);
    }
  }, [fetcher.data]);

  const loadMore = () => {
    fetcher.load(`/episodes?page=${page + 1}`);
    setPage((p) => p + 1);
  };

  return (
    <div className="flex h-[95.5vh] animate-fade-in-up">
      <aside className="w-[450px] border-r border-gray-300 p-4 box-border flex flex-col bg-white shadow-lg transition-all duration-500 ease-in-out">
        <h2 className="text-lg font-bold mb-4">Episodes</h2>
        <ul className="list-none p-0 flex-1 overflow-y-auto m-0">
          {episodes.map((ep) => (
            <li
              key={ep.id}
              className="mb-2 transition-transform duration-300 hover:translate-x-3 w-fit truncate"
            >
              <Link
                to={String(ep.id)}
                className="hover:text-blue-600 font-medium"
              >
                {ep.episode}: {ep.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={loadMore}
          disabled={fetcher.state === "loading"}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center gap-2"
        >
          {fetcher.state === "loading" ? (
            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full mr-2"></span>
          ) : null}
          {fetcher.state === "loading" ? "Loading..." : "Load More"}
        </button>
      </aside>
      <main className="flex-1 bg-gray-50 transition-all duration-500 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
};

export default View;
