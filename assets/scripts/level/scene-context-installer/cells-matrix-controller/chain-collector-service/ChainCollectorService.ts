import IChainCollectorService from "./IChainCollectorService";
import ICellsMatrix from "../cells-matrix/ICellsMatrix";
import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import ITilesAlgorithm from "./tiles-algorithm/ITilesAlgorithm";
import TilesAlgorithm from "./tiles-algorithm/TilesAlgorithm";

export default class ChainCollectorService implements IChainCollectorService {

    private tilesAlgorithm: ITilesAlgorithm = null;

    constructor(cellsMatrix: ICellsMatrix) {
        this.tilesAlgorithm = new TilesAlgorithm(cellsMatrix);
    }

    public collectChains(cell: CellBase): CellBase[][] {
        const element = cell.getElement();

        if (!element) {
            return [];
        }

        if (typeof (element as any).getTileType === "function") {
            return this.tilesAlgorithm.collect(cell);
        }

        cc.error("ChainCollectorService: Unsupported element type.");
        return [];
    }

}
