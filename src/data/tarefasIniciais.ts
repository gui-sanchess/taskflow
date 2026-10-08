import type { Tarefa } from "../types/Tarefa";
export const tarefasIniciais: Tarefa[] = [
  {
    _id: "1",
    titulo: "Revisar proposta comercial",
    descricao: "Revisar valores e prazo antes do envio.",
    data: "2026-09-18",
    prioridade: "high",
    projeto: "Comercial",
    concluida: false,
  },
  {
    _id: "2",
    titulo: "Preparar apresentação",
    descricao: "Organizar os principais resultados do projeto.",
    data: "2026-09-20",
    prioridade: "medium",
    projeto: "Projeto Atlas",
    concluida: false,
  },
  {
    _id: "3",
    titulo: "Atualizar documentação",
    descricao: "Registrar as últimas alterações realizadas.",
    data: "2026-09-16",
    prioridade: "low",
    projeto: "Interno",
    concluida: true,
  },
];
