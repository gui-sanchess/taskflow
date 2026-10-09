import { CalendarDays, CircleCheckBig, Inbox, Plus, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const itensMenu = [
  { titulo: "Hoje", caminho: "/", icone: Sun },
  { titulo: "Próximas", caminho: "/proximas", icone: CalendarDays },
  { titulo: "Todas as tarefas", caminho: "/tarefas", icone: Inbox },
  { titulo: "Concluídas", caminho: "/concluidas", icone: CircleCheckBig },
];
export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img
          src="https://kiro.dev/images/community/events/thumbnails/meetup2.svg"
          alt="TaskFlow"
          className="sidebar__logo"
        />
        <div>
          <strong>TaskFlow</strong>
          <span>Gerenciador de tarefas</span>
        </div>
      </div>
      <button className="sidebar__new-task" type="button">
        <Plus size={18} />
        Nova tarefa
      </button>
      <nav className="sidebar__nav">
        {itensMenu.map((item) => {
          const Icone = item.icone;
          return (
            <NavLink
              key={item.caminho}
              to={item.caminho}
              className={({ isActive }) => (isActive ? "sidebar__link sidebar__link--active" : "sidebar__link")}
            >
              <Icone size={19} />
              <span>{item.titulo}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
