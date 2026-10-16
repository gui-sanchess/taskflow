import { useOutletContext } from "react-router-dom";
import type { LayoutContext } from "../../components/Layout/Layout";
import { TaskList } from "../../components/TaskList/TaskList";
import { useTarefas } from "../../contexts/TarefasContext";
import type { Tarefa } from "../../types/Tarefa";
import "./Tasks.css";

export type VisaoTarefas = "tarefas" | "hoje" | "proximas" | "concluidas";

type TasksProps = {
  visao: VisaoTarefas;
};

function obterDataAtual() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

const cabecalhosVisao: Record<
  VisaoTarefas,
  { eyebrow: string; titulo: string; descricao: string }
> = {
  tarefas: {
    eyebrow: "VISÃO GERAL",
    titulo: "Todas as tarefas",
    descricao: "Visualização completa das tarefas pendentes cadastradas.",
  },
  hoje: {
    eyebrow: "HOJE",
    titulo: "Tarefas de hoje",
    descricao: "Tarefas agendadas para o dia de hoje.",
  },
  proximas: {
    eyebrow: "EM BREVE",
    titulo: "Próximas tarefas",
    descricao: "Tarefas agendadas para datas futuras.",
  },
  concluidas: {
    eyebrow: "HISTÓRICO",
    titulo: "Tarefas concluídas",
    descricao: "Tarefas que já foram finalizadas.",
  },
};

export function Tasks({ visao }: Readonly<TasksProps>) {
  const { abrirTaskModal } = useOutletContext<LayoutContext>();
  const { tarefas, carregando, erro, removerTarefa, alternarConclusao } =
    useTarefas();

  const dataAtual = obterDataAtual();

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    switch (visao) {
      case "concluidas":
        return tarefa.concluida;
      case "hoje":
        return !tarefa.concluida && tarefa.data === dataAtual;
      case "proximas":
        return !tarefa.concluida && tarefa.data > dataAtual;
      case "tarefas":
      default:
        return !tarefa.concluida;
    }
  });

  const info = cabecalhosVisao[visao];

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">{info.eyebrow}</p>
          <h1>{info.titulo}</h1>
          <p>{info.descricao}</p>
        </div>

        <button type="button" onClick={() => abrirTaskModal()}>
          Nova tarefa
        </button>
      </div>

      {erro && <p className="tasks-page__error">{erro}</p>}

      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : (
        <TaskList
          tarefas={tarefasFiltradas}
          aoExcluir={removerTarefa}
          aoEditar={(tarefa: Tarefa) => abrirTaskModal(tarefa)}
          aoAlternarConclusao={alternarConclusao}
        />
      )}
    </section>
  );
}
