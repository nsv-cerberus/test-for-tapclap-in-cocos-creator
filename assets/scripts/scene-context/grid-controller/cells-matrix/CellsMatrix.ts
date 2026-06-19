import ICellsMatrix from "./ICellsMatrix";
import Cell from "../../../../scripts/level/grid/Cell";

export default class CellsMatrix implements ICellsMatrix {
    private matrix: Cell[][] = null;

    public init(rows: number, cols: number, ): void {
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols);
        }
    }

    public getMatrix(): Cell[][] {
        return this.matrix;
    }

    public setCell(row: number, col: number, cell: Cell): void {
        if (this.matrix && this.matrix[row] && this.matrix[row][col]) {
            this.matrix[row][col] = cell;
        } else {
            throw new Error(`Cannot set cell at position (${row}, ${col}).`);
        }
    }
}