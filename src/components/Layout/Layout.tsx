import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.css";
export function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__content">
        <Header />
        <main className="app-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
