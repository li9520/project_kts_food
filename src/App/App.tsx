import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CatalogPage from "./pages/CatalogPage";
import RecipePage from "./pages/RecipePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/receipt">
          <Route path=":id" element={<RecipePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
