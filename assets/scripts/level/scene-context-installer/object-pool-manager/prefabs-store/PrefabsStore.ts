const {ccclass, property, menu} = cc._decorator;

import PrefabsStoreBase from "./PrefabsStoreBase";
import Cell from "../../../gameplay-field/grid/cell/Cell";
import Tile from "../../../gameplay-field/grid/cell/elements/Tile";

@ccclass
@menu("Level/Scene Context Installer/Stores/Prefabs Store")
export default class PrefabsStore extends PrefabsStoreBase {

    @property(cc.Prefab)
    private cellPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private tilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private rocketsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private bombPrefab: cc.Prefab = null;

    public getPrefab(componentClass: Function): cc.Prefab {
        if (componentClass === Cell) {
            return this.cellPrefab;
        }

        if (componentClass === Tile) {
            return this.tilePrefab;
        }

        cc.error("Prefab for component not found");
        return null;
    }
    
    public getTilePrefab(): cc.Prefab {
        return this.tilePrefab;
    }
}
