import type { Route } from "../+types/posts/$postId";
import { useLoaderData } from "react-router";

type Post = { id: number; title: string; body: string };

export async function loader({ params }: Route.LoaderArgs) {
  const { postId } = params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (response.status === 404) {
    throw new Response("Post not found", { status: 404 });
  }
  if (!response.ok) {
    throw new Response("Failed to load post", { status: 502 });
  }
  const post = (await response.json()) as Post;
  return post;
}

export default function PostDetail() {
  const post = useLoaderData<typeof loader>();
  return (
    <article className="space-y-2">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="whitespace-pre-wrap leading-7">{post.body}</p>
    </article>
  );
}

