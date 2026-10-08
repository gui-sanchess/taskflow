export type Prioridade = "high" | "medium" | "low";
export type Tarefa = {
  _id?: string;
  titulo: string;
  descricao: string;
  data: string;
  prioridade: Prioridade;
  projeto: string;
  concluida: boolean;
};
