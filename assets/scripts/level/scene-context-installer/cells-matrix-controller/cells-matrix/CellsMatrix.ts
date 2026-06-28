import ICellsMatrix from "./ICellsMatrix";
import CellBase from "../../../../../scripts/level/gameplay-field/grid/cell/CellBase";

export default class CellsMatrix implements ICellsMatrix {
    private readonly matrix: CellBase[][] = null;

    constructor(rows: number, cols: number) {
        this.matrix = new Array(rows);

        for (let row = 0; row < rows; row++) {
            this.matrix[row] = new Array(cols);
        }
    }

    public setupCell(row: number, col: number, cell: CellBase): void {
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

    public getMatrix(): CellBase[][] {
        return this.matrix;
    }

    public getSizeMatrix(): cc.Size {
        const rows = this.matrix.length;
        const cols = rows > 0 ? this.matrix[0].length : 0;
        return new cc.Size(cols, rows);
    }

    public getEmptyCells(): CellBase[] {
        const emptyCells: CellBase[] = [];

        cc.log('Length: ', this.getSizeMatrix().width, ' Height: ', this.getSizeMatrix().height);
        
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const cell = this.matrix[row][col];
                if (!cell.getElement()) {
                    emptyCells.push(cell);
                }
            }
        }

        return emptyCells;
    }

    public clearMatrix(): void {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                this.matrix[row][col] = null;
            }
        }
    }

    public getNeighbors(cell: CellBase): CellBase[] {
        const neighbors: CellBase[] = [];
        const position = this.resolveCellPosition(cell);

        if (!position) {
            return neighbors;
        }

        const row = position.row;
        const col = position.col;

        const directions = [
            { row: -1, col: 0 }, // Up
            { row: 1, col: 0 },  // Down
            { row: 0, col: -1 }, // Left
            { row: 0, col: 1 }   // Right
        ];

        for (const direction of directions) {
            const newRow = row + direction.row;
            const newCol = col + direction.col;

            if (newRow < 0 || newRow >= this.matrix.length) {
                continue;
            }

            const matrixRow = this.matrix[newRow];
            if (!matrixRow || newCol < 0 || newCol >= matrixRow.length) {
                continue;
            }

            const neighborCell = matrixRow[newCol];
            if (neighborCell) {
                neighbors.push(neighborCell);
            }
        }

        return neighbors;
    }

    private resolveCellPosition(cell: CellBase): { row: number; col: number } | null {
        const position = cell.getPositionInMatrix();
        const directRow = position.row;
        const directCol = position.col;

        if (
            directRow >= 0 &&
            directRow < this.matrix.length &&
            directCol >= 0 &&
            this.matrix[directRow] &&
            directCol < this.matrix[directRow].length &&
            this.matrix[directRow][directCol] === cell
        ) {
            return { row: directRow, col: directCol };
        }

        for (let row = 0; row < this.matrix.length; row++) {
            const matrixRow = this.matrix[row];
            if (!matrixRow) {
                continue;
            }

            for (let col = 0; col < matrixRow.length; col++) {
                if (matrixRow[col] === cell) {
                    return { row, col };
                }
            }
        }

        cc.warn("CellsMatrix: Cell position is not found in matrix.");
        return null;
    }
}