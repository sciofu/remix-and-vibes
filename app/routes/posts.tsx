import { Outlet, Link } from "@remix-run/react";

export default function PostsLayout() {
  return (
    <main className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Demonstrates nested routes with an index, dynamic route, and action.
      </p>
      <div className="flex gap-4 text-sm">
        <Link className="hover:underline" to="/posts">Index</Link>
        <Link className="hover:underline" to="/posts/new">Create (Action)</Link>
      </div>
      <Outlet />
    </main>
  );
}