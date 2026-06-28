import ISpawnService from "./ISpawnService";
import SceneContext from "../../SceneContext";
import ObjectPoolManager from "../../object-pool-manager/ObjectPoolManager";

import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import Tile from "../../../gameplay-field/grid/cell/elements/Tile";

export default class SpawnService implements ISpawnService {

    private poolManager: ObjectPoolManager;

    constructor() {
        this.poolManager = SceneContext.get(ObjectPoolManager);
    }

    public spawnTails(emptyCells: CellBase[]): void {
        for (const emptyCell of emptyCells) {
            const tail = this.poolManager.get(Tile);
            if (tail) {
                emptyCell.addElement(tail as Tile);
            } else {
                cc.error("No available tails in the pool.");
            }
        }
    }

}
