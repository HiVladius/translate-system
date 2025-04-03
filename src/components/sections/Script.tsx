import React, { useRef, useState } from "react";
import mammoth from "mammoth";
import * as pdfjs from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./styles/Script.css";

import { TextItem } from "../interface/interfaces";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface ScriptProps {
  onContentLoaded: (content: string) => void;
}

export const Script = ({ onContentLoaded }: ScriptProps) => {
  const [docContent, setDocContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.endsWith(".docx") && !file.name.endsWith(".pdf")) {
      setError("Please upload a .docx  or .pdf file");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setFileName(file.name);

      let htmlContent = "";

      if (file.name.endsWith(".docx")) {
        //Proceso para archivos .docx
        const aarayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({
          arrayBuffer: aarayBuffer,
        });
        htmlContent = result.value; // The generated HTML

        if (result.messages.length > 0) {
          console.log("Warning: ", result.messages);
        }
      } else {
        htmlContent = await convertPdfToHtml(file);
      }

      setDocContent(htmlContent);

      if (onContentLoaded) {
        onContentLoaded(htmlContent);
      }
    } catch (error) {
      console.error("Error reading file:", error);
      setError("Error reading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const convertPdfToHtml = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    let htmlContent = '<div class="pdf-content">';

    // Procesar cada página del PDF
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      htmlContent += `<div class="pdf-page" data-page="${i}">`;

      // Procesar cada elemento de texto de la página
      let lastY = null;
      for (const item of textContent.items) {
        if ("str" in item) {
          const textItem = item as TextItem;

          // Si es una línea nueva (cambio en la coordenada Y)
          if (lastY !== null && lastY !== textItem.transform[5]) {
            htmlContent += "<br>";
          }

          // Añadir el texto con algún estilo según sus propiedades
          htmlContent +=
            `<span style="font-size: ${textItem.height}px;">${textItem.str}</span>`;

          lastY = textItem.transform[5];
        }
      }

      htmlContent += '</div><hr class="pdf-page-divider">';
    }

    htmlContent += "</div>";
    return htmlContent;
  };

  const handleReset = () => {
    setDocContent("");
    setFileName("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <div className="script-container">
      <div className="file-upload-section">
        <h2>Cargar Documento Word</h2>
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".docx, .pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            id="docx-file"
            className="file-input"
          />
          <label htmlFor="docx-file" className="file-label">
            Seleccionar archivo .docx
          </label>
          {fileName && <span className="file-name">{fileName}</span>}
          {docContent && (
            <button onClick={handleReset} className="reset-button">
              Cargar otro archivo
            </button>
          )}
        </div>

        {loading && <div className="loading">Procesando documento...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      {docContent && (
        <div className="document-preview">
          <h3>Vista previa del documento</h3>
          <div
            className="document-content"
            dangerouslySetInnerHTML={{ __html: docContent }}
          />
        </div>
      )}
    </div>
  );
};
