import type { Tarefa } from "../../types/Tarefa";
import { TaskCard } from "../TaskCard/TaskCard";
import "./TaskList.css";

type TaskListProps = {
  tarefas: Tarefa[];
  aoExcluir: (id: string) => void;
  aoEditar: (tarefa: Tarefa) => void;
  aoAlternarConclusao: (tarefa: Tarefa) => void;
};

export function TaskList({
  tarefas,
  aoExcluir,
  aoEditar,
  aoAlternarConclusao,
}: Readonly<TaskListProps>) {
  if (tarefas.length === 0) {
    return (
      <div className="task-list__empty">
        <h3>Nada por aqui</h3>
        <p>Crie uma nova tarefa ou altere os filtros para continuar.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tarefas.map((tarefa) => (
        <TaskCard
          key={tarefa._id}
          tarefa={tarefa}
          aoExcluir={aoExcluir}
          aoEditar={aoEditar}
          aoAlternarConclusao={aoAlternarConclusao}
        />
      ))}
    </div>
  );
}
