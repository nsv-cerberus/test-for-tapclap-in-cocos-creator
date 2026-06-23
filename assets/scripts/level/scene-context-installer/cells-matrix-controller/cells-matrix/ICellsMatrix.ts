import Cell from "../../../level/grid/cell/Cell";

export default interface ICellsMatrix {
    addCell(row: number, col: number, cell: Cell): void;
    getMatrix(): Cell[][];
    clearMatrix(): void;
}