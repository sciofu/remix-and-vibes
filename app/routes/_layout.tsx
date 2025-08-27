import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div
        style={{
          background: "#eee",
          padding: "1rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Layout Route
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
