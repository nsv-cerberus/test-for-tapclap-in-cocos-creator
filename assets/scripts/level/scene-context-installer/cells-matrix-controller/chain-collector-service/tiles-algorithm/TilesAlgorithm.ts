import ITilesAlgorithm from "./ITilesAlgorithm";
import ICellsMatrix from "../../cells-matrix/ICellsMatrix";

import CellBase from "../../../../gameplay-field/grid/cell/CellBase";
import Tile from "../../../../gameplay-field/grid/cell/elements/Tile";

export default class TilesAlgorithm implements ITilesAlgorithm {

    private cellsMatrix: ICellsMatrix;

    constructor(cellsMatrix: ICellsMatrix) {
        this.cellsMatrix = cellsMatrix;
    }

    public collect(cell: CellBase): CellBase[][] {
        const startElement = cell.getElement();

        if (!this.isTile(startElement)) {
            return [];
        }

        const targetType = startElement.getTileType();

        const chainSteps: CellBase[][] = [];
        const visited = new Set<CellBase>();
        const queue: { cell: CellBase, step: number }[] = [];

        visited.add(cell);
        queue.push({ cell, step: 0 });

        while (queue.length > 0) {
            const current = queue.shift();

            if (!current) {
                continue;
            }

            const currentCell = current.cell;

            if (!chainSteps[current.step]) {
                chainSteps[current.step] = [];
            }

            chainSteps[current.step].push(currentCell);

            const neighbors = this.cellsMatrix.getNeighbors(currentCell);

            for (const neighborCell of neighbors) {
                if (visited.has(neighborCell)) {
                    continue;
                }

                const neighborElement = neighborCell.getElement();

                if (!this.isTile(neighborElement)) {
                    continue;
                }

                if (neighborElement.getTileType() !== targetType) {
                    continue;
                }

                visited.add(neighborCell);
                queue.push({ cell: neighborCell, step: current.step + 1 });
            }
        }
        
        cc.log("Collected chain steps: ", chainSteps.map(step => step.map(c => c.getPositionInMatrix())));

        return chainSteps;
    }

    private isTile(element: any): element is Tile {
        return element && typeof element.getTileType === "function";
    }
}
