import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Search } from "pages/Search";
import { Pokemon } from "pages/Pokemon";
import { Error404 } from "pages/Error404";
import "./App.css";

function App() {
  return (                    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/pokemon/:idOrName" element={<Pokemon />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
                                                    