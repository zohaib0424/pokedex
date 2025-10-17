import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from "pages/SearchPage/SearchPage";
import { PokemonPage } from "pages/PokemonPage/PokemonPage";
import { NotFoundPage } from "pages/NotFoundPage/NotFoundPage";
import "./App.css";

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
