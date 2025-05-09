import { useEffect, useRef, useState } from "react";
import { GridSection } from "./GridSection";
import { Resizer } from "./Resizer";
import { ResizableGridProps } from "../../../interface/interfaces";

export const ResizableGrid = ({
  initialLayout = { columns: [1, 10, 1], rows: [2, 10, 1] },
  sections = {
    topLeft: { title: "VIDEO", content: null },
    topRight: { title: "SCRIP", content: null },
    bottomLeft: { title: "TIME LAPS", content: null },
    bottomRight: { title: "TRADUCCION", content: null },
  },
}: ResizableGridProps) => {
  // Estado para las proporciones del grid
  const [gridLayout, setGridLayout] = useState(() => {
    // Intentar cargar el layout guardado del localStorage
    const savedLayout = localStorage.getItem('gridLayout');
    return savedLayout ? JSON.parse(savedLayout) : initialLayout;
  });

  // Referencias para elementos DOM
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Estados para controlar el proceso de redimensionamiento
  const [resizing, setResizing] = useState({
    isHorizontal: false,
    isVertical: false,
    startX: 0,
    startY: 0,
    startRatioH: 0,
    startRatioV: 0,
  });

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Guardar el layout en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('gridLayout', JSON.stringify(gridLayout));
  }, [gridLayout]);

  // Iniciar el redimensionamiento horizontal
  const startResizeHorizontal = (e: any) => {
    if (!containerRef.current) return;

    const { columns } = gridLayout;
    const startRatioH = columns[0] / (columns[0] + columns[2]);

    setResizing({
      ...resizing,
      isHorizontal: true,
      startX: e.clientX,
      startRatioH,
    });

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  };

  // Iniciar el redimensionamiento vertical
  const startResizeVertical = (e: any) => {
    if (!containerRef.current) return;

    const { rows } = gridLayout;
    const startRatioV = rows[0] / (rows[0] + rows[2]);

    setResizing({
      ...resizing,
      isVertical: true,
      startY: e.clientY,
      startRatioV,
    });

    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  };

  // Actualizar dimensiones durante el redimensionamiento
  const handleResize = (e: any) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // Redimensionamiento horizontal
    if (resizing.isHorizontal) {
      const dx = e.clientX - resizing.startX;
      const containerWidth = containerRect.width;
      const newRatio = resizing.startRatioH + (dx / containerWidth);

      if (newRatio > 0.1 && newRatio < 0.9) {
        const { columns } = gridLayout;
        const totalFr = columns[0] + columns[2];
        const newColumns = [...columns];
        newColumns[0] = totalFr * newRatio;
        newColumns[2] = totalFr * (1 - newRatio);

        setGridLayout({
          ...gridLayout,
          columns: newColumns,
        });
      }
    }

    // Redimensionamiento vertical
    if (resizing.isVertical) {
      const dy = e.clientY - resizing.startY;
      const containerHeight = containerRect.height;
      const newRatio = resizing.startRatioV + (dy / containerHeight);

      if (newRatio > 0.1 && newRatio < 0.9) {
        const { rows } = gridLayout;
        const totalFr = rows[0] + rows[2];
        const newRows = [...rows];
        newRows[0] = totalFr * newRatio;
        newRows[2] = totalFr * (1 - newRatio);

        setGridLayout({
          ...gridLayout,
          rows: newRows,
        });
      }
    }
  };

  // Finalizar el redimensionamiento
  const stopResize = () => {
    setResizing({
      ...resizing,
      isHorizontal: false,
      isVertical: false,
    });

    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // Configurar los event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);

    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [resizing]);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Crear las propiedades del grid
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `${gridLayout.columns[0]}fr ${
      windowSize.width < 768 ? "5" : gridLayout.columns[1]
    }px ${gridLayout.columns[2]}fr`,
    gridTemplateRows: `${gridLayout.rows[0]}fr ${
      windowSize.height < 500 ? "5" : gridLayout.rows[1]
    }px ${gridLayout.rows[2]}fr`,
    height: windowSize.width < 576 ? "100vh" : "95vh",
    width: "100%",
    maxWidth: "1800px",
    margin: "0 auto",
    backgroundColor: "#f0f0f0",
    border: windowSize.width < 576 ? "1px solid #666" : "2px solid #666",
    borderRadius: windowSize.width < 576 ? "5px" : "10px",
    padding: windowSize.width < 576 ? "5px" : "10px",
    
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div ref={containerRef} style={gridStyle}>
        {/* VIDEO */}
        <GridSection
          gridPosition={{ column: 1, row: 1 }}
          title={sections.topLeft.title}
          content={sections.topLeft.content}
        />

        {/* Separador horizontal */}
        <Resizer
          direction="horizontal"
          onMouseDown={startResizeHorizontal}
          gridPosition={{ column: 2, row: "1 / span 3" }}
        />

        {/* SCRIPT */}
        <GridSection
          gridPosition={{ column: 3, row: 1 }}
          title={sections.topRight.title}
          content={sections.topRight.content}
        />

        {/* Separador vertical */}
        <Resizer
          direction="vertical"
          onMouseDown={startResizeVertical}
          gridPosition={{ column: "1 / span 3", row: 2 }}
        />

        {/* TIME LAPS */}
        <GridSection
          gridPosition={{ column: 1, row: 3 }}
          title={sections.bottomLeft.title}
          content={sections.bottomLeft.content}
        />

        {/* TRADUCCION */}
        <GridSection
          gridPosition={{ column: 3, row: 3 }}
          title={sections.bottomRight.title}
          content={sections.bottomRight.content}
        />
      </div>
    </div>
  );
};
