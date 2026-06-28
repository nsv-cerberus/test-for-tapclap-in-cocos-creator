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

    public collectChains(cell: CellBase): CellBase[] {
        const elementType = cell.getElement().getType();
        
        switch (elementType.constructor.name) {
            case "Tile":
                return this.tilesAlgorithm.collect(cell);
            default:
                cc.error("ChainCollectorService: Unsupported element type: " + elementType.constructor.name);
                return [];
        }
    }

}
