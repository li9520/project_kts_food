import CatalogPage from "@app/pages/CatalogPage";
//import RecipePage from "@app/pages/RecipePage";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { Navigate, Route, Routes } from "react-router-dom";

import RecipePage from "./pages/RecipePage";
//import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  useQueryParamsStoreInit();
  return (
    /*<BrowserRouter>*/
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/receipt/:id" element={<RecipePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    //</BrowserRouter>*/
    //<CatalogPage />
  );
};

export default App;
