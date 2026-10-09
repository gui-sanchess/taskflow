import { Plus, Search } from "lucide-react";
import "./Header.css";
export function Header() {
  return (
    <header className="header">
      <div className="header__search">
        <Search size={18} />
        <input type="search" placeholder="Buscar tarefas..." aria-label="Buscar tarefas" />
      </div>
      <button className="header__new-task" type="button">
        <Plus size={18} />
        Nova tarefa
      </button>
    </header>
  );
}
