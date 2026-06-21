import ICellsMatrix from "./ICellsMatrix";
import Cell from "../../../../scripts/level/grid/cell/Cell";

export default class CellsMatrix implements ICellsMatrix {
    private matrix: Cell[][] = null;

    constructor(rows: number, cols: number) {
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols);
        }
    }

    public setCell(row: number, col: number, cell: Cell): void {
        if (this.matrix && this.matrix[row] && this.matrix[row][col] !== undefined) {
            this.matrix[row][col] = cell;
        } else {
            throw new Error(`Cannot set cell at position (${row}, ${col}).`);
        }
    }

    public getMatrix(): Cell[][] {
        return this.matrix;
    }
}