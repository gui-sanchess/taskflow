import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { criarTarefa, excluirTarefa, listarTarefas } from "../services/tarefaService";
import type { Tarefa } from "../types/Tarefa";

type NovaTarefa = Omit<Tarefa, "_id">;
type TarefasContextType = {
  tarefas: Tarefa[];
  carregando: boolean;
  erro: string;
  adicionarTarefa: (novaTarefa: NovaTarefa) => Promise<void>;
  removerTarefa: (id: string) => Promise<void>;
};

const TarefasContext = createContext<TarefasContextType | null>(null);

type TarefasProviderProps = {
  children: ReactNode;
};

export function TarefasProvider({ children }: Readonly<TarefasProviderProps>) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
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

  async function adicionarTarefa(novaTarefa: NovaTarefa) {
    try {
      setErro("");
      const tarefaCriada = await criarTarefa(novaTarefa);
      setTarefas((tarefasAtuais) => [tarefaCriada, ...tarefasAtuais]);
    } catch {
      setErro("Não foi possivel criar a tarefa.");
      throw new Error("Não foi possivel criar a tarefa.");
    }
  }

  async function removerTarefa(id: string) {
    try {
      setErro("");
      await excluirTarefa(id);
      setTarefas((tarefasAtuais) => tarefasAtuais.filter((tarefa) => tarefa._id !== id));
    } catch {
      setErro("Não foi possivel excluir a tarefa.");
    }
  }

  return (
    <TarefasContext.Provider value={{ tarefas, carregando, erro, adicionarTarefa, removerTarefa }}>
      {children}
    </TarefasContext.Provider>
  );
}

export function useTarefas() {
  const contexto = useContext(TarefasContext);
  if (!contexto) {
    throw new Error("useTarefas deve ser utilizado dentro de TarefasProvider.");
  }
  return contexto;
}
