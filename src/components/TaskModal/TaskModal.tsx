import { X } from "lucide-react";
import { useTarefas } from "../../contexts/TarefasContext";
import type { Tarefa } from "../../types/Tarefa";
import { TaskForm } from "../TaskForm/TaskForm";
import "./TaskModal.css";

type NovaTarefa = Omit<Tarefa, "_id">;

type TaskModalProps = {
  aberto: boolean;
  aoFechar: () => void;
  tarefaEmEdicao?: Tarefa | null;
};

export function TaskModal({
  aberto,
  aoFechar,
  tarefaEmEdicao,
}: Readonly<TaskModalProps>) {
  const { adicionarTarefa, atualizarTarefa } = useTarefas();

  if (!aberto) return null;

  async function salvarTarefa(dados: NovaTarefa) {
    if (tarefaEmEdicao?._id) {
      await atualizarTarefa({ ...dados, _id: tarefaEmEdicao._id });
    } else {
      await adicionarTarefa(dados);
    }
    aoFechar();
  }

  return (
    <div className="task-modal">
      <div
        className="task-modal__content"
        role="dialog"
        aria-modal="true"
        aria-label={tarefaEmEdicao ? "Editar tarefa" : "Nova tarefa"}
      >
        <button
          className="task-modal__close"
          type="button"
          aria-label="Fechar"
          onClick={aoFechar}
        >
          <X size={20} />
        </button>

        <TaskForm
          aoSalvar={salvarTarefa}
          aoCancelar={aoFechar}
          tarefaEmEdicao={tarefaEmEdicao}
        />
      </div>
    </div>
  );
}
