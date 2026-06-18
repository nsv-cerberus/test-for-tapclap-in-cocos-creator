import ICellsMatrix from "./ICellsMatrix";
import Cell from "../../../../scripts/level/grid/cells/Cell";

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

    public setMatrix(matrix: Cell[][]): void {
        this.matrix = matrix;
    }
}