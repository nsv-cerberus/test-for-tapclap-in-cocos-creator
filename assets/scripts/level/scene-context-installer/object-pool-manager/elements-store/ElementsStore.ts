const {ccclass, property, menu} = cc._decorator;

import ElementsStoreBase from "./ElementsStoreBase";
import Tile from "../../../gameplay-field/grid/cell/elements/Tile";

@ccclass
@menu("Level/Scene Context Installer/Stores/Elements Store")
export default class ElementsStore extends ElementsStoreBase {

    @property(cc.Prefab)
    private tilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private rocketsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private bombPrefab: cc.Prefab = null;

    public getPrefab(componentClass: Function): cc.Prefab {
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