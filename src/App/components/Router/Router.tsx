import CatalogPage from "@app/pages/CatalogPage";
import RecipePage from "@app/pages/RecipePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Router = () => {
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

export default Router;
