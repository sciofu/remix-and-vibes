import type { Route } from "../+types/posts/new";
import { Form, useActionData, useNavigation } from "react-router";

type ActionData = { error?: string; success?: boolean };

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const newPost = {
    title: String(formData.get("title") || ""),
    body: String(formData.get("body") || ""),
    userId: 1,
  };

  if (!newPost.title || !newPost.body) {
    return { error: "Title and Body are required" } satisfies ActionData;
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    return { error: "Failed to create post" } satisfies ActionData;
  }

  return { success: true } satisfies ActionData;
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Create Post | Remix Showcase" }];
}

export default function NewPost() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="space-y-3 max-w-xl">
      <h2 className="text-xl font-medium">Create New Post (Action)</h2>
      {actionData?.error && (
        <p className="text-red-600">{actionData.error}</p>
      )}
      {actionData?.success && (
        <p className="text-green-700">Post created (fake API)!</p>
      )}
      <Form method="post" className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Title</label>
          <input name="title" type="text" className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" required />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Body</label>
          <textarea name="body" rows={6} className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" required />
        </div>
        <button disabled={isSubmitting} className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50">
          {isSubmitting ? "Submitting..." : "Create"}
        </button>
      </Form>
    </section>
  );
}

