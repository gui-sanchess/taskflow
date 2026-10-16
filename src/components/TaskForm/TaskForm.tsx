import { useState, type FormEvent } from "react";
import type { Prioridade, Tarefa } from "../../types/Tarefa";
import "./TaskForm.css";

type NovaTarefa = Omit<Tarefa, "_id">;

type TaskFormProps = {
  aoSalvar: (tarefa: NovaTarefa) => Promise<void>;
  aoCancelar: () => void;
  tarefaEmEdicao?: Tarefa | null;
};

export function TaskForm({
  aoSalvar,
  aoCancelar,
  tarefaEmEdicao,
}: Readonly<TaskFormProps>) {
  const [formulario, setFormulario] = useState<NovaTarefa>(() => ({
    titulo: tarefaEmEdicao?.titulo ?? "",
    descricao: tarefaEmEdicao?.descricao ?? "",
    data: tarefaEmEdicao?.data ?? "",
    prioridade: tarefaEmEdicao?.prioridade ?? "medium",
    projeto: tarefaEmEdicao?.projeto ?? "",
    concluida: tarefaEmEdicao?.concluida ?? false,
  }));
  const [salvando, setSalvando] = useState(false);

  function alterarCampo(campo: keyof NovaTarefa, valor: string | boolean) {
    setFormulario((estadoAtual) => ({
      ...estadoAtual,
      [campo]: valor,
    }));
  }

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    try {
      setSalvando(true);
      await aoSalvar(formulario);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="task-form" onSubmit={enviarFormulario}>
      <h2>{tarefaEmEdicao ? "Editar tarefa" : "Nova tarefa"}</h2>

      <label>
        <span>Título</span>
        <input
          required
          maxLength={100}
          value={formulario.titulo}
          onChange={(evento) => alterarCampo("titulo", evento.target.value)}
          placeholder="Ex.: Revisar proposta comercial"
        />
      </label>

      <label>
        <span>Descrição</span>
        <textarea
          rows={3}
          maxLength={400}
          value={formulario.descricao}
          onChange={(evento) => alterarCampo("descricao", evento.target.value)}
          placeholder="Adicione contexto ou observações"
        />
      </label>

      <label>
        <span>Prazo</span>
        <input
          type="date"
          value={formulario.data}
          onChange={(evento) => alterarCampo("data", evento.target.value)}
        />
      </label>

      <label>
        <span>Prioridade</span>
        <select
          value={formulario.prioridade}
          onChange={(evento) =>
            alterarCampo("prioridade", evento.target.value as Prioridade)
          }
        >
          <option value="high">Alta</option>
          <option value="medium">Média</option>
          <option value="low">Baixa</option>
        </select>
      </label>

      <label>
        <span>Projeto</span>
        <input
          value={formulario.projeto}
          onChange={(evento) => alterarCampo("projeto", evento.target.value)}
          placeholder="Ex.: Projeto Atlas"
        />
      </label>

      <div className="task-form__actions">
        <button type="button" onClick={aoCancelar}>
          Cancelar
        </button>
        <button type="submit" disabled={salvando}>
          {salvando
            ? "Salvando..."
            : tarefaEmEdicao
              ? "Salvar alterações"
              : "Criar tarefa"}
        </button>
      </div>
    </form>
  );
}
