import axios from "axios";
import type { Tarefa } from "../types/Tarefa";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
const RECURSO = "/tarefas";

export async function listarTarefas() {
  const resposta = await api.get<Tarefa[]>(RECURSO);
  return resposta.data;
}

export async function criarTarefa(tarefa: Omit<Tarefa, "_id">) {
  const resposta = await api.post<Tarefa>(RECURSO, tarefa);
  return resposta.data;
}

export async function excluirTarefa(id: string) {
  await api.delete(`${RECURSO}/${id}`);
}
