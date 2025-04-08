import { ResizableGrid } from "./components/translator/grids/ResizableGrid";
import { Script } from "../src/components/translator/sections/Script";
import { Translation } from "../src/components/translator/sections/Translation";
import { Video } from "../src/components/translator/sections/Video";
import borders from "../src/assets/BOARDERS.mp4";
import { NavBar } from "./components/translator/navbar/NavBar";

export const EditionPage = () => {
  const handleDocumentLoaded = (content: string) => {
    console.log("Documento cargado con éxito, longitud:", content.length);
    // Aquí puedes añadir lógica para procesar el contenido cargado
  };

  const video = borders;

  const section = {
    topLeft: {
      title: "VIDEO",
      content: <Video src={video} />,
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
      <NavBar />
      <ResizableGrid sections={section} />
    </>
  );
};
