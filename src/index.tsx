import React from "react";

//import RecipePage from "@app/pages/RecipePage";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";

import "./config/configureMobX";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //<React.StrictMode>
  /*<Routes>
      <Route path="/" element={<App />} />
      <Route path="/receipt/:id" element={<RecipePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>*/
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
