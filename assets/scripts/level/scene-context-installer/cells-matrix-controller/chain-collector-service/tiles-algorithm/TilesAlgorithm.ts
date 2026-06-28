import ITilesAlgorithm from "./ITilesAlgorithm";
import ICellsMatrix from "../../cells-matrix/ICellsMatrix";

import CellBase from "../../../../gameplay-field/grid/cell/CellBase";
import Tile from "../../../../gameplay-field/grid/cell/elements/Tile";

export default class TilesAlgorithm implements ITilesAlgorithm {

    private cellsMatrix: ICellsMatrix;

    constructor(cellsMatrix: ICellsMatrix) {
        this.cellsMatrix = cellsMatrix;
    }

    public collect(cell: CellBase): CellBase[] {
        const startElement = cell.getElement();

        if (!this.isTile(startElement)) {
            return [];
        }

        const targetType = startElement.getTileType();

        const chain: CellBase[] = [];
        const visited = new Set<CellBase>();
        const queue: CellBase[] = [];

        visited.add(cell);
        queue.push(cell);

        while (queue.length > 0) {
            const currentCell = queue.shift();

            if (!currentCell) {
                continue;
            }

            chain.push(currentCell);

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
                queue.push(neighborCell);
            }
        }
        
        cc.log("Collected chain length: ", chain.length, " Chain positions: ", chain.map(c => c.getPositionInMatrix()));

        return chain;
    }

    private isTile(element: any): element is Tile {
        return element && typeof element.getTileType === "function";
    }
}
