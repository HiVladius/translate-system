
import { ResizableGrid } from "../grids/ResizableGrid";
import { Script } from "../sections/Script";
import { Translation } from "../sections/Translation";

export const EditionPage = () => {
  
    const handleDocumentLoaded = (content: string) => {
      console.log("Documento cargado con éxito, longitud:", content.length);
      // Aquí puedes añadir lógica para procesar el contenido cargado
    };

  const section =  {
    topLeft: {
      title: 'VIDEO',
      content: null
    },
    topRight: {
      title: 'SCRIPT',
      content: <Script onContentLoaded={handleDocumentLoaded} />,
    },
    bottomLeft: {
      title: 'TIME LAPS',
      content: null
    },
    bottomRight: {
      title: 'TRADUCCION',
      content: <Translation />,
    },
  }




  return (

    <>

    <ResizableGrid  sections={section} />

    </>
  );
};
