import CellBase from "../../../gameplay-field/grid/cell/CellBase";

export default interface ICellsMatrix {
    setupCell(row: number, col: number, cell: CellBase): void;
    getMatrix(): CellBase[][];
    getSizeMatrix(): cc.Size;
    getEmptyCells(): CellBase[];
    getNeighbors(cell: CellBase): CellBase[];
    clearMatrix(): void;
}