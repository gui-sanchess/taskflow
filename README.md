# TaskFlow — Gerenciador de Tarefas

O **TaskFlow** é uma aplicação didática desenvolvida em **React + TypeScript** para trabalhar, de forma progressiva, a construção de interfaces baseadas em componentes, navegação entre páginas, gerenciamento de estado e comunicação com uma API REST.

O projeto utiliza como referência um protótipo visual previamente definido. A implementação não busca converter o HTML original linha a linha, mas transformar a interface em uma estrutura organizada de páginas, componentes, estado e serviços.

## Objetivos do projeto

O projeto foi estruturado para permitir o desenvolvimento dos seguintes conceitos:

- leitura visual de uma interface e identificação de responsabilidades;
- componentização em React;
- reutilização e composição de componentes;
- navegação com React Router;
- renderização de listas com `map()`;
- uso de `key` em coleções;
- gerenciamento de estado com `useState`;
- sincronização com serviços externos por meio de `useEffect`;
- formulários controlados;
- comunicação HTTP com Axios;
- operações REST com `GET`, `POST` e `DELETE`;
- separação entre interface e camada de acesso aos dados.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router
- Axios
- Lucide React
- CSS
- CrudCrud

## Estrutura conceitual

A organização do TaskFlow parte da leitura da interface e da identificação das responsabilidades presentes no protótipo.

```text
TaskFlow
│
├── App
│   └── React Router
│
├── Layout
│   ├── Sidebar
│   ├── Header
│   └── Página atual
│
├── Pages
│   ├── Today
│   ├── Upcoming
│   ├── Tasks
│   └── Completed
│
├── TaskList
│   └── TaskCard
│
├── TaskForm
│
└── tarefaService
    └── Axios
        └── CrudCrud
```

A estrutura é construída de forma incremental. Nem todos os componentes identificados no protótipo precisam ser implementados na primeira etapa.

## Páginas

A aplicação possui quatro visões principais:

- **Hoje** — tarefas relacionadas ao foco atual;
- **Próximas** — tarefas previstas para os próximos dias;
- **Todas as tarefas** — conjunto completo de tarefas cadastradas;
- **Concluídas** — tarefas finalizadas.

As páginas utilizam a mesma estrutura principal da aplicação. A `Sidebar` e o `Header` permanecem visíveis, enquanto o conteúdo da página atual é renderizado pelo React Router.

## Componentes principais

### `Layout`

Responsável por combinar os elementos permanentes da interface com a página correspondente à rota atual.

### `Sidebar`

Responsável pela navegação principal da aplicação.

### `Header`

Apresenta a busca e as ações gerais da interface.

### `TaskList`

Recebe uma coleção de tarefas e produz os componentes `TaskCard`.

### `TaskCard`

Representa visualmente uma tarefa individual.

### `TaskForm`

Responsável pela coleta dos dados necessários para a criação de uma tarefa.

## Estrutura de uma tarefa

```ts
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
```

O campo `_id` é opcional porque ainda não existe antes da persistência. Após a criação no CrudCrud, o backend gera esse identificador.

## Comunicação com a API

O TaskFlow utiliza o **CrudCrud** como backend temporário.

```text
Tasks
  ↓
tarefaService
  ↓
Axios
  ↓
CrudCrud
```

| Operação | Método HTTP | Recurso |
|---|---|---|
| Listar tarefas | `GET` | `/tarefas` |
| Criar tarefa | `POST` | `/tarefas` |
| Excluir tarefa | `DELETE` | `/tarefas/:id` |

## Configuração do endpoint

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://crudcrud.com/api/SEU_ENDPOINT
```

No código, o endereço é acessado por:

```ts
import.meta.env.VITE_API_URL
```

> O endpoint do CrudCrud possui tempo de validade. Quando ele expirar, será necessário gerar um novo endereço e atualizar o arquivo `.env`.

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd taskflow
```

Instale as dependências:

```bash
npm install
```

Instale, se necessário, as dependências utilizadas no projeto:

```bash
npm install axios react-router-dom lucide-react
```

Crie o arquivo `.env` e informe o endpoint do CrudCrud. Em seguida, execute:

```bash
npm run dev
```

## Fluxo de carregamento das tarefas

```text
Tasks
  ↓
useEffect
  ↓
listarTarefas()
  ↓
tarefaService
  ↓
GET /tarefas
  ↓
CrudCrud
  ↓
setTarefas()
  ↓
TaskList
  ↓
TaskCard
```

O `useEffect` é utilizado porque existe uma sincronização entre o componente React e um sistema externo.

## Fluxo de criação de uma tarefa

```text
TaskForm
  ↓
aoSalvar(novaTarefa)
  ↓
Tasks
  ↓
criarTarefa()
  ↓
tarefaService
  ↓
POST /tarefas
  ↓
CrudCrud
  ↓
tarefa criada com _id
  ↓
setTarefas()
  ↓
TaskList
  ↓
TaskCard
```

Após a resposta do `POST`, a tarefa criada é inserida diretamente no estado da aplicação.

## Fluxo de exclusão

```text
TaskCard
  ↓
aoExcluir(id)
  ↓
TaskList
  ↓
Tasks
  ↓
excluirTarefa(id)
  ↓
tarefaService
  ↓
DELETE /tarefas/:id
  ↓
CrudCrud
  ↓
setTarefas()
```

O `TaskCard` não acessa diretamente a API. Ele apenas comunica a intenção de excluir uma tarefa. A operação é coordenada pela página `Tasks` e executada pela camada de serviço.

## Estrutura de pastas

```text
src/
├── components/
│   ├── Header/
│   ├── Layout/
│   ├── Sidebar/
│   ├── TaskCard/
│   ├── TaskForm/
│   └── TaskList/
│
├── pages/
│   ├── Completed/
│   ├── Tasks/
│   ├── Today/
│   └── Upcoming/
│
├── services/
│   └── tarefaService.ts
│
├── styles/
│   ├── global.css
│   └── variables.css
│
├── types/
│   └── Tarefa.ts
│
├── App.tsx
└── main.tsx
```

A criação de novas pastas e componentes deve acompanhar o surgimento de novas responsabilidades na aplicação.

## Verificação da implementação

Ao final da etapa principal, verifique se:

- a aplicação inicia sem erros;
- a navegação entre as páginas funciona;
- `Sidebar` e `Header` permanecem visíveis;
- a troca de rota não recarrega o documento HTML;
- as tarefas são carregadas do CrudCrud;
- a interface apresenta estado de carregamento;
- falhas de acesso à API produzem uma mensagem compreensível;
- uma nova tarefa pode ser cadastrada;
- o `_id` retornado pelo backend é utilizado pelo frontend;
- uma tarefa pode ser excluída;
- após a exclusão, o estado da aplicação é atualizado.

## Evolução do projeto

A arquitetura completa do protótipo também prevê componentes como:

- `TaskIndicators`;
- `IndicatorCard`;
- `ProjectList`;
- `ProjectItem`;
- `TaskModal`;
- `ProjectModal`;
- `ConfirmModal`;
- `SettingsModal`;
- `EmptyState`;
- `Toast`.

Esses componentes podem ser incorporados gradualmente conforme as funcionalidades correspondentes forem implementadas.

## Observação

O TaskFlow é utilizado como projeto didático. O objetivo principal não é apenas obter uma aplicação funcional, mas compreender como uma interface pode ser transformada progressivamente em uma arquitetura baseada em componentes, estado, navegação e serviços.
