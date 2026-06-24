import ISpawnService from "./ISpawnService";
import PoolManager from "../../pool-manager/PoolManager";
import Cell from "../../../gameplay-field/grid/cell/Cell";

export default class SpawnService implements ISpawnService {

    private poolManager: PoolManager;

    constructor(poolManager: PoolManager) {
        this.poolManager = poolManager;
    }

    spawn(emptyCells: Cell[]): void {
        // Implement spawn logic here
    }

}
