import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EditionPage } from "./components/principalpages/EditionPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EditionPage />
  </StrictMode>,
);
