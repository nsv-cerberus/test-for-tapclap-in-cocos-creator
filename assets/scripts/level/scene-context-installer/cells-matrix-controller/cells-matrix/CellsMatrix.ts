import { GameplayEvent } from "../../../EventBus";

import ICellsMatrix from "./ICellsMatrix";
import Cell from "../../../../scripts/level/grid/cell/Cell";

export default class CellsMatrix implements ICellsMatrix {
    private readonly matrix: Cell[][] = null;

    constructor(rows: number, cols: number) {
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols);
        }
    }

    public addCell(row: number, col: number, cell: Cell): void {
        if (this.matrix && this.matrix[row] && this.matrix[row][col] !== undefined) {
            this.matrix[row][col] = cell;
        } else {
            throw new Error(`Cannot set cell at position (${row}, ${col}).`);
        }
    }

    public getMatrix(): Cell[][] {
        return this.matrix;
    }

    public clearMatrix(): void {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                this.matrix[row][col] = null;
            }
        }
    }
}