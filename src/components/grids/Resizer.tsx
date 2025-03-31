
import React from 'react'

export const Resizer = ({
    direction = 'horizontal',
    onMouseDown, 
    gridPosition = {column: 2, row: 1}
}: {
    direction?: 'horizontal' | 'vertical',
    onMouseDown: React.MouseEventHandler<HTMLDivElement>,
    gridPosition?: { column: number, row: number }
}) => {

    const isHorizontal = direction === 'horizontal';

    const style: React.CSSProperties = {
        gridColumn: gridPosition.column,
        gridRow: gridPosition.row,
        backgroundColor: isHorizontal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        cursor: isHorizontal ? 'col-resize' : 'row-resize',
        position: 'relative',
    }

    const handleStyle: React.CSSProperties = {
        gridColumn: gridPosition.column,
        gridRow: gridPosition.row,
        backgroundColor: isHorizontal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        cursor: isHorizontal ? 'col-resize' : 'row-resize',
        position: 'relative',
    }

  return (
    <div style={style} onMouseDown={onMouseDown}>
        <div style={handleStyle}/>

    </div>
  )
}

