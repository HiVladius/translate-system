import React from "react";

export const GridSection = ({
    gridPosition = { column: 1, row: 1 },
    title = "",
    content = null,
}) => {
    const style: React.CSSProperties = {
        gridColumn: gridPosition.column,
        gridRow: gridPosition.row,
        border: "1px solid #3b5898",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
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

    return (
        <div style={style}>
            <div style={titleStyle}>{title}</div>
            <div style={contentStyle}>
                {content || title}
            </div>
        </div>
    );
};
