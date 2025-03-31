
import { ResizableGrid } from "../grids/ResizableGrid";
import { Translation } from "../sections/Translation";

export const EditionPage = () => {
  

  const section =  {
    topLeft: {
      title: 'VIDEO',
      content: null
    },
    topRight: {
      title: 'SCRIPT',
      content: null
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
