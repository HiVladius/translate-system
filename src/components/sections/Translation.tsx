import { useEffect, useRef, useState } from "react";
import {
    button,
    columnWidths,
    dialogInputStyle,
    inputStyle,
    tableStyle,
    tdStyle,
    thStyle,
} from "./styles/styles";
import { RowData } from "../interface/interfaces";

export const Translation = () => {
    const [rows, setRows] = useState<RowData[]>([]);
    const lastCellRef = useRef<HTMLInputElement>(null);

    const autoResizeTextArea = (element: HTMLTextAreaElement) => {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
    };

    const addNewRow = () => {
        const newId = rows.length > 0
            ? Math.max(...rows.map((row) => row.id)) + 1
            : 1;
        setRows([...rows, { id: newId, tc: "", character: "", dialog: "" }]);

        const btn = document.querySelector("button") as HTMLButtonElement;
        if (btn) {
            btn.disabled = false;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        }
    };

    const handleCelleChange = (
        rowId: number,
        field: keyof RowData,
        value: string,
    ) => {
        const updateRows = rows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
        );
        setRows(updateRows);

        if (field === "dialog") {
            setTimeout(() => {
                const textarea = document.querySelector(
                    `textarea[data-id="${rowId}"]`,
                ) as HTMLTextAreaElement;
                if (textarea) {
                    autoResizeTextArea(textarea);
                }
            }, 0);
        }
    };

    // Handle the Tab key to add a new row when the last cell is focused
    const handleTabKey = (e: any, rowIndex: any, columIndex: any) => {
        if (e.key === "Tab" && !e.shiftKey) {
            if (rowIndex === rows.length - 1 && columIndex === 2) {
                e.preventDefault();
                addNewRow();
                addNewRow();
                addNewRow();

                setTimeout(() => {
                    if (lastCellRef.current) {
                        lastCellRef.current.focus();
                    }
                }, 0);
            }
        }
    };

    useEffect(() => {
        document.querySelectorAll("textarea").forEach((textarea) => {
            autoResizeTextArea(textarea as HTMLTextAreaElement);
        });
    }, [rows]);

    return (
        <div style={{ height: "100%", overflowY: "auto", padding: "10px" }}>
            <h2 style={{ margin: "0 0 10px 0", color: "#3b5898" }}>
                Traduccion
            </h2>

            <table style={tableStyle as React.CSSProperties}>
                <thead>
                    <tr>
                        <th
                            style={{
                                ...thStyle as React.CSSProperties,
                                width: columnWidths.tc,
                            }}
                        >
                            TC
                        </th>
                        <th
                            style={{
                                ...thStyle as React.CSSProperties,
                                width: columnWidths.character,
                            }}
                        >
                            Character
                        </th>
                        <th
                            style={{
                                ...thStyle as React.CSSProperties,
                                width: columnWidths.dialog,
                            }}
                        >
                            Dialog
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={row.id}>
                            <td style={tdStyle as React.CSSProperties}>
                                <input
                                    type="text"
                                    value={row.tc}
                                    style={inputStyle as React.CSSProperties}
                                    onChange={(e) =>
                                        handleCelleChange(
                                            row.id,
                                            "tc",
                                            e.target.value,
                                        )}
                                    onKeyDown={(e) =>
                                        handleTabKey(e, rowIndex, 0)}
                                    ref={rowIndex === rows.length - 1 && 0 === 0
                                        ? lastCellRef
                                        : null}
                                />
                            </td>
                            <td style={tdStyle as React.CSSProperties}>
                                <input
                                    type="text"
                                    value={row.character}
                                    style={inputStyle as React.CSSProperties}
                                    onChange={(e) =>
                                        handleCelleChange(
                                            row.id,
                                            "character",
                                            e.target.value,
                                        )}
                                    onKeyDown={(e) =>
                                        handleTabKey(e, rowIndex, 1)}
                                />
                            </td>
                            <td style={tdStyle as React.CSSProperties}>
                                <textarea
                                    value={row.dialog}
                                    style={dialogInputStyle as React.CSSProperties}
                                    onChange={(e) =>
                                        handleCelleChange(
                                            row.id,
                                            "dialog",
                                            e.target.value,
                                        )}
                                    onKeyDown={(e) => {
                                        if (e.key === "Tab") {
                                            handleTabKey(e, rowIndex, 2);
                                        }
                                    }}
                                    rows={1}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={addNewRow}
                style={button as React.CSSProperties}
            >
                Agregar Fila
            </button>
        </div>
    );
};
