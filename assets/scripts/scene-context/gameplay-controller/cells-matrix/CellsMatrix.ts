import { GameplayEvent } from "../../../EventBus";

import EventBus from "../../../EventBus";
import ICellsMatrix from "./ICellsMatrix";
import Cell from "../../../../scripts/level/grid/cell/Cell";

export default class CellsMatrix implements ICellsMatrix {
    private matrix: Cell[][] = null;

    constructor(rows: number, cols: number) {
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols);
        }

        EventBus.on(GameplayEvent.CellCreated, this.setCell, this);
    }

    public setCell(row: number, col: number, cell: Cell): void {
        if (this.matrix && this.matrix[row] && this.matrix[row][col] !== undefined) {
            this.matrix[row][col] = cell;
        } else {
            throw new Error(`Cannot set cell at position (${row}, ${col}).`);
        }
    }

    // тут должны подключаться несколько алгоритмов, для тейлов и бустеров!
    // например для тейлов - алгоритм, который будет искать все соседние клетки одного цвета и удалять их, а для бустеров - алгоритм,
    // который будет удалять в все элементы в соседних клетках.

    public destroy(): void {
        EventBus.targetOff(this);
    }
}