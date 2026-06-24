import Cell from "../../../gameplay-field/grid/cell/Cell";

export default interface ICellsMatrix {
    setupCell(row: number, col: number, cell: Cell): void;
    getMatrix(): Cell[][];
    getSizeMatrix(): cc.Size;
    clearMatrix(): void;
}