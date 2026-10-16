import { useState } from "react";
import { Outlet } from "react-router-dom";
import type { Tarefa } from "../../types/Tarefa";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { TaskModal } from "../TaskModal/TaskModal";
import "./Layout.css";

export type LayoutContext = {
  abrirTaskModal: (tarefa?: Tarefa) => void;
};

export function Layout() {
  const [taskModalAberto, setTaskModalAberto] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

  function abrirTaskModal(tarefa?: Tarefa) {
    setTarefaEmEdicao(tarefa ?? null);
    setTaskModalAberto(true);
  }

  function fecharTaskModal() {
    setTaskModalAberto(false);
    setTarefaEmEdicao(null);
  }

  return (
    <div className="app-layout">
      <Sidebar aoNovaTarefa={() => abrirTaskModal()} />

      <div className="app-layout__content">
        <Header aoNovaTarefa={() => abrirTaskModal()} />

        <main className="app-layout__main">
          <Outlet context={{ abrirTaskModal }} />
        </main>
      </div>

      <TaskModal
        key={tarefaEmEdicao?._id ?? "nova"}
        aberto={taskModalAberto}
        aoFechar={fecharTaskModal}
        tarefaEmEdicao={tarefaEmEdicao}
      />
    </div>
  );
}
