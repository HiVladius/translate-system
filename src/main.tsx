import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EditionPage } from "./EditionPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EditionPage />
  </StrictMode>,
);
