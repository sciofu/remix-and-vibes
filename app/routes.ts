import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/posts/layout.tsx", [
    // /posts
    index("routes/posts/index.tsx"),
    // /posts/:postId
    route(":postId", "routes/posts/$postId.tsx"),
    // /posts/new
    route("new", "routes/posts/new.tsx"),
  ]),
] satisfies RouteConfig;
