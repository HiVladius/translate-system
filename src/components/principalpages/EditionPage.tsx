import { ResizableGrid } from "../grids/ResizableGrid";
import { Script } from "../sections/Script";
import { Translation } from "../sections/Translation";
import { Video } from "../sections/Video";
import borders from "../../assets/BOARDERS.mp4";

export const EditionPage = () => {
  const handleDocumentLoaded = (content: string) => {
    console.log("Documento cargado con éxito, longitud:", content.length);
    // Aquí puedes añadir lógica para procesar el contenido cargado
  };

  const video = borders;

  const section = {
    topLeft: {
      title: "VIDEO",
      content: <Video src={video} width="720px" />,
    },
    topRight: {
      title: "SCRIPT",
      content: <Script onContentLoaded={handleDocumentLoaded} />,
    },
    bottomLeft: {
      title: "TIME LAPS",
      content: null,
    },
    bottomRight: {
      title: "TRADUCCION",
      content: <Translation />,
    },
  };

  return (
    <>
      <ResizableGrid sections={section} />
    </>
  );
};
