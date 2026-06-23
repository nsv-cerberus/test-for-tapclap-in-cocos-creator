import IGravityService from "./IGravityService";
import ICellsMatrix from "../cells-matrix/ICellsMatrix";

export default class GravityService implements IGravityService {

    private cellsMatrix: ICellsMatrix;

    constructor(cellsMatrix: ICellsMatrix) {
        this.cellsMatrix = cellsMatrix;
    }

    applyGravity(): void {
        // Implementation for applying gravity goes here
    }

}
