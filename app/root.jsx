import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

import "./tailwind.css"

export default function App() {
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <LinksNav />
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}

function LinksNav() {
  const navItems = [
    { to: "/locations", label: "Locations" },
    { to: "/characters", label: "Characters" },
    { to: "/episodes", label: "Episodes" },
  ];
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex items-center gap-8 shadow-lg animate-fade-in sticky top-0 z-10">
      {navItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className="text-lg font-bold pb-1 mr-8 transition-colors duration-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}