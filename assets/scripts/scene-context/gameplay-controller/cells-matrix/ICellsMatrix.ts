import Cell from "../../../level/grid/cell/Cell";

export default interface ICellsMatrix {
    setCell(row: number, col: number, cell: Cell): void;
    destroy(): void;
}