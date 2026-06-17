const {ccclass, property} = cc._decorator;

import ValidationHelper from "../../helpers/PrefabValidationHelper";
import Tile from "./Tile";

@ccclass
export default class GridItems extends cc.Component {

    @property(cc.Prefab)
    tilePrefab: cc.Prefab = null;

    onLoad(): void {
        if (!ValidationHelper.checkPrefab<Tile>(this.tilePrefab, Tile)) {
            throw new Error(`[GridItems] Wrong tile prefab`);
        }
    }
}
