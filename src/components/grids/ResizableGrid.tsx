import { useEffect, useRef, useState } from "react";
import { GridSection } from "./GridSection";
import { Resizer } from "./Resizer";
import { ResizableGridProps } from "./interface/interfaces";


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
  const [gridLayout, setGridLayout] = useState(initialLayout);

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

  // Iniciar el redimensionamiento horizontal
  const startResizeHorizontal = (e) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
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
  const startResizeVertical = (e) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
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
  const handleResize = (e) => {
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

  // Crear las propiedades del grid
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `${gridLayout.columns[0]}fr ${
      gridLayout.columns[1]
    }px ${gridLayout.columns[2]}fr`,
    gridTemplateRows: `${gridLayout.rows[0]}fr ${gridLayout.rows[1]}px ${
      gridLayout.rows[2]
    }fr`,
    height: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
    border: "2px solid #666",
    borderRadius: "10px",
    padding: "20px",
    boxSizing: "border-box",
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

export default ResizableGrid;
