import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { TarefasProvider } from "./contexts/TarefasContext";
import { Tasks } from "./pages/Tasks/Tasks";

export default function App() {
  return (
    <BrowserRouter>
      <TarefasProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Tasks visao="hoje" />} />
            <Route path="/proximas" element={<Tasks visao="proximas" />} />
            <Route path="/tarefas" element={<Tasks visao="tarefas" />} />
            <Route path="/concluidas" element={<Tasks visao="concluidas" />} />
          </Route>
        </Routes>
      </TarefasProvider>
    </BrowserRouter>
  );
}
