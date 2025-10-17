import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage, PokemonPage, NotFoundPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/pokemon/:idOrName" element={<PokemonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
