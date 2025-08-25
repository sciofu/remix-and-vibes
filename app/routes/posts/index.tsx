import type { Route } from "../+types/posts/index";
import { Link, useLoaderData } from "react-router";

type Post = { id: number; title: string };

export async function loader() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  if (!response.ok) {
    throw new Response("Failed to load posts", { status: 502 });
  }
  const posts = (await response.json()) as Post[];
  return posts;
}

export default function PostsIndex() {
  const posts = useLoaderData<typeof loader>();
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-medium">Latest Posts (Loader)</h2>
      <ul className="list-disc pl-5 space-y-1">
        {posts.map((p) => (
          <li key={p.id}>
            <Link className="hover:underline" to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

