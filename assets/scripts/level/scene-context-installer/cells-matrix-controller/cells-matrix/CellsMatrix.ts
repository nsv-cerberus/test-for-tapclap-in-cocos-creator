import ICellsMatrix from "./ICellsMatrix";
import Cell from "../../../../../scripts/level/gameplay-field/grid/cell/Cell";

export default class CellsMatrix implements ICellsMatrix {
    private readonly matrix: Cell[][] = null;

    constructor(rows: number, cols: number) {
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols);
        }
    }

    public setupCell(row: number, col: number, cell: Cell): void {
        if (
            row >= 0 && 
            row < this.matrix.length &&
            col >= 0 && 
            col < this.matrix[row].length
        ) {
            this.matrix[row][col] = cell;
        } else {
            cc.error(`Cannot set cell at position (${row}, ${col}).`);
        }
    }

    public getMatrix(): Cell[][] {
        return this.matrix;
    }

    public getSizeMatrix(): cc.Size {
        return new cc.Size(this.matrix.length, this.matrix[0].length);
    }

    public clearMatrix(): void {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                this.matrix[row][col] = null;
            }
        }
    }
}