import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import ICellsMatrix from "../cells-matrix/ICellsMatrix";
import IChainCollectorService from "../chain-collector-service/IChainCollectorService";
import IAvailableMovesService from "./IAvailableMovesService";

export default class AvailableMovesService implements IAvailableMovesService {
    private cellsMatrix: ICellsMatrix = null;
    private chainCollectorService: IChainCollectorService = null;

    constructor(cellsMatrix: ICellsMatrix, chainCollectorService: IChainCollectorService) {
        this.cellsMatrix = cellsMatrix;
        this.chainCollectorService = chainCollectorService;
    }

    public hasAvailableMoves(minTiles: number): boolean {
        const matrix = this.cellsMatrix.getMatrix();
        const visited = new Set<CellBase>();

        for (let row = 0; row < matrix.length; row++) {
            const matrixRow = matrix[row];

            if (!matrixRow) {
                continue;
            }

            for (let col = 0; col < matrixRow.length; col++) {
                const cell = matrixRow[col];

                if (!cell || visited.has(cell)) {
                    continue;
                }

                const chains = this.chainCollectorService.collectChains(cell);
                const chainCells = this.getChainCells(chains);

                for (const chainCell of chainCells) {
                    visited.add(chainCell);
                }

                if (chainCells.length >= minTiles) {
                    return true;
                }
            }
        }

        return false;
    }

    private getChainCells(chains: CellBase[][]): CellBase[] {
        const chainCells: CellBase[] = [];

        for (const chain of chains) {
            if (!chain) {
                continue;
            }

            chainCells.push(...chain);
        }
        
        return chainCells;
    }

}
