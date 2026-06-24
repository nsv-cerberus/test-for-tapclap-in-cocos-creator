import ICellsInputService from "./ICellsInputService";
import ICellsMatrix from "../cells-matrix/ICellsMatrix";

export default class CellsInputService implements ICellsInputService {

    private cellsMatrix: ICellsMatrix;

    constructor(cellsMatrix: ICellsMatrix) {
        this.cellsMatrix = cellsMatrix;
    }

    public collectChains(): void {
        // Implementation for collecting chains goes here
    }

}
