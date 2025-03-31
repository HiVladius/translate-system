import  { useRef, useState } from "react";

interface RowData {
    id: number;
    tc: string;
    character: string;
    dialog: string;
}

export const Translation = () => {
    const [rows, setRows] = useState<RowData[]>([]);

    const lastCellRef = useRef<HTMLInputElement>(null);

    const addNewRow = () => {
        const newId = rows.length > 0
            ? Math.max(...rows.map((row) => row.id)) + 1
            : 1;
        setRows([...rows, { id: newId, tc: "", character: "", dialog: "" }]);
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
    };

    // Funcion para manejar el evento de tabulacion
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

    return <div>Translation</div>;
};
