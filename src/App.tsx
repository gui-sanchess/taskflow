import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { TarefasProvider } from "./contexts/TarefasContext";
import { Completed } from "./pages/Completed/Completed";
import { Tasks } from "./pages/Tasks/Tasks";
import { Today } from "./pages/Today/Today";
import { Upcoming } from "./pages/Upcoming/Upcoming";

export default function App() {
  return (
    <BrowserRouter>
      <TarefasProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Today />} />
            <Route path="/proximas" element={<Upcoming />} />
            <Route path="/tarefas" element={<Tasks />} />
            <Route path="/concluidas" element={<Completed />} />
          </Route>
        </Routes>
      </TarefasProvider>
    </BrowserRouter>
  );
}
