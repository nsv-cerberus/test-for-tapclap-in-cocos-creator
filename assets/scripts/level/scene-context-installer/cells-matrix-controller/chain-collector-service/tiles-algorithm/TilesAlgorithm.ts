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

        if (!(startElement instanceof Tile)) {
            return [];
        }

        const targetType = startElement.getTileType();

        cc.log("Collecting chain for tile type: ", targetType);

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

                if (!(neighborElement instanceof Tile)) {
                    
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
}