import { useEffect, useState } from "react";
import { TaskList } from "../../components/TaskList/TaskList";
import { criarTarefa, excluirTarefa, listarTarefas } from "../../services/tarefaService";
import type { Tarefa } from "../../types/Tarefa";
import "./Tasks.css";
import { TaskForm } from "../../components/TaskForm/TaskForm";
export function Tasks() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await listarTarefas();
        setTarefas(dados);
      } catch {
        setErro("Não foi possível carregar as tarefas.");
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);
  if (carregando) {
    return <p>Carregando tarefas...</p>;
  }
  if (erro) {
    return <p>{erro}</p>;
  }

  async function adicionarTarefa(novaTarefa: Omit<Tarefa, "_id">) {
    try {
      setErro("");
      const tarefaCriada = await criarTarefa(novaTarefa);
      setTarefas((tarefasAtuais) => [tarefaCriada, ...tarefasAtuais]);
      setFormularioAberto(false);
    } catch {
      setErro("Não foi possível criar a tarefa.");
    }
  }

  async function removerTarefa(id: string) {
    try {
      setErro("");
      await excluirTarefa(id);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa._id !== id));
    } catch {
      setErro("Não foi possível excluir a tarefa.");
    }
  }

  return (
    <section className="tasks-page">
      <div className="tasks-page__heading">
        <div>
          <p className="page-eyebrow">VISÃO GERAL</p>
          <h1>Todas as tarefas</h1>
          <p>Visualização completa das tarefas cadastradas.</p>
        </div>
        <button type="button" onClick={() => setFormularioAberto(true)}>
          Nova tarefa
        </button>
      </div>
      {erro && <p className="tasks-page__error">{erro}</p>}
      {formularioAberto && <TaskForm aoSalvar={adicionarTarefa} aoCancelar={() => setFormularioAberto(false)} />}
      {carregando ? <p>Carregando tarefas...</p> : <TaskList tarefas={tarefas} aoExcluir={removerTarefa} />}
    </section>
  );
}
