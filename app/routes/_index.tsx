import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="container mx-auto p-4 space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Remix Concepts Showcase</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This app demonstrates core Remix data APIs:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Loaders</strong>: Server-side data fetching before render.
          </li>
          <li>
            <strong>Actions</strong>: Server-side mutations via forms.
          </li>
          <li>
            <strong>Nested Routes</strong>: Shared layouts with an <code>Outlet</code>.
          </li>
          <li>
            <strong>Route Params</strong>: Dynamic segments like <code>/posts/:postId</code>.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-medium">Try it out</h2>
        <div className="flex gap-4">
          <Link className="underline" to="/posts">View Posts (Loader)</Link>
          <Link className="underline" to="/posts/1">Example Post (Param)</Link>
          <Link className="underline" to="/posts/new">Create Post (Action)</Link>
        </div>
      </section>
    </main>
  );
}