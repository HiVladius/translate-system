import React from "react";
import { ResizerProps } from "../../../interface/interfaces";

export const Resizer: React.FC<ResizerProps> = ({
  direction = "horizontal",
  onMouseDown,
  gridPosition = { column: 2, row: 1 },
}) => {
  const isHorizontal = direction === "horizontal";

  const style: React.CSSProperties = {
    gridColumn: gridPosition.column,
    gridRow: gridPosition.row,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    cursor: isHorizontal ? "col-resize" : "row-resize",
    position: "relative",
  };

  return <div style={style} onMouseDown={onMouseDown} />;
};
