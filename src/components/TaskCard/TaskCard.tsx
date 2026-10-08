import { CalendarDays, Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import type { Tarefa } from "../../types/Tarefa";
import "./TaskCard.css";

type TaskCardProps = { tarefa: Tarefa; aoExcluir: (id: string) => void };

export function TaskCard({ tarefa, aoExcluir }: Readonly<TaskCardProps>) {
  return (
    <article className={tarefa.concluida ? "task-card task-card--completed" : "task-card"}>
      <button
        className="task-card__check"
        type="button"
        aria-label={tarefa.concluida ? "Reabrir tarefa" : "Concluir tarefa"}
      >
        {tarefa.concluida ? <CircleCheckBig size={22} /> : <Circle size={22} />}
      </button>
      <div className="task-card__content">
        <div className="task-card__header">
          <h3>{tarefa.titulo}</h3>
          <div className="task-card__actions">
            <button type="button" aria-label="Editar tarefa">
              <Pencil size={17} />
            </button>
            <button
              type="button"
              aria-label="Excluir tarefa"
              onClick={() => {
                if (tarefa._id) {
                  aoExcluir(tarefa._id);
                }
              }}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
        <p>{tarefa.descricao}</p>
        <div className="task-card__meta">
          <span>
            <CalendarDays size={15} />
            {tarefa.data}
          </span>
          <span>{tarefa.projeto}</span>
          <span>{tarefa.prioridade}</span>
        </div>
      </div>
    </article>
  );
}
