import { type ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

type ActionData = { error?: string; success?: boolean };

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const newPost = {
    title: String(formData.get("title") || ""),
    body: String(formData.get("body") || ""),
    userId: 1,
  };

  if (!newPost.title || !newPost.body) {
    return json<ActionData>({ error: "Title and Body are required" }, { status: 400 });
  }

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    return json<ActionData>({ error: "Failed to create post" }, { status: 500 });
  }

  return json<ActionData>({ success: true });
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