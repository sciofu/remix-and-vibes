import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type Post = { id: number; title: string };

export async function loader({}: LoaderFunctionArgs) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  if (!response.ok) {
    throw new Response("Failed to load posts", { status: 502 });
  }
  const posts = (await response.json()) as Post[];
  return json(posts);
}

export default function PostsIndex() {
  const posts = useLoaderData<typeof loader>();
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-medium">Latest Posts (Loader)</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded border border-gray-200 dark:border-gray-800">
        {posts.map((p) => (
          <li key={p.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-900">
            <Link className="hover:underline" to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}