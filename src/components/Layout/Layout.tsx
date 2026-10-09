import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { TaskModal } from "../TaskModal/TaskModal";
import "./Layout.css";

export type LayoutContext = { abrirTaskModal: () => void };

export function Layout() {
  const [taskModalAberto, setTaskModalAberto] = useState(false);

  function abrirTaskModal() {
    setTaskModalAberto(true);
  }

  function fecharTaskModal() {
    setTaskModalAberto(false);
  }

  return (
    <div className="app-layout">
      <Sidebar aoNovaTarefa={abrirTaskModal} />
      <div className="app-layout__content">
        <Header aoNovaTarefa={abrirTaskModal} />
        <main className="app-layout__main">
          <Outlet context={{ abrirTaskModal }} />
        </main>
      </div>
      <TaskModal aberto={taskModalAberto} aoFechar={fecharTaskModal} />
    </div>
  );
}