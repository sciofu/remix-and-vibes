import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

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
    <>
      {navItems.map(item => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            textDecoration: 'none',
            fontWeight: 'bold',
            paddingBottom: 2,
            marginRight: '2rem',
          }}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}