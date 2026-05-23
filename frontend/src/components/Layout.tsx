import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
