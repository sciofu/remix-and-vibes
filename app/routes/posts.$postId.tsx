import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type Post = { id: number; title: string; body: string };

export async function loader({ params }: LoaderFunctionArgs) {
  const { postId } = params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (response.status === 404) {
    throw new Response("Post not found", { status: 404 });
  }
  if (!response.ok) {
    throw new Response("Failed to load post", { status: 502 });
  }
  const post = (await response.json()) as Post;
  return json(post);
}

export default function PostDetail() {
  const post = useLoaderData<typeof loader>();
  return (
    <article className="space-y-3 max-w-2xl">
      <Link to="/posts" className="text-sm underline">← Back to posts</Link>
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="whitespace-pre-wrap leading-7 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 rounded p-4 border border-gray-200 dark:border-gray-800">
        {post.body}
      </p>
    </article>
  );
}