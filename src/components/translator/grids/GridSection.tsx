import React, { useEffect, useRef, useState } from "react";
import type { GridSectionProps } from "../../../interface/interfaces";

export const GridSection = (
  { gridPosition, title, content }: GridSectionProps,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Función para actualizar las dimensiones
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Restamos espacio para el título y padding
        const contentHeight = clientHeight - 40; // Aproximadamente para el título y márgenes
        setDimensions({
          width: clientWidth - 10, // Restando padding
          height: contentHeight > 0 ? contentHeight : 0,
        });
      }
    };

    // Actualizar dimensiones iniciales
    updateDimensions();

    // Configurar un observador para detectar cambios de tamaño
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const style: React.CSSProperties = {
    gridColumn: gridPosition.column,
    gridRow: gridPosition.row,
    border: "1px solid #3b5898",
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    overflow: "auto",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#888",
    fontSize: "1.2rem",
    margin: "0 0 10px 0",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // Clonar el contenido y pasarle las dimensiones
  const contentWithDimensions = content && React.isValidElement(content)
    ? React.cloneElement(
      content as React.ReactElement<{ width?: number; height?: number }>,
      { width: dimensions.width, height: dimensions.height },
    )
    : content;

  return (
    <div ref={containerRef} style={style}>
      <div style={titleStyle}>{title}</div>
      <div style={contentStyle}>
        {contentWithDimensions || title}
      </div>
    </div>
  );
};
