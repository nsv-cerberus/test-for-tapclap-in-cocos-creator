const {ccclass, property} = cc._decorator;

import GridController from "../../scene-context/grid-controller/GridController";
import SceneContext from "../../scene-context/SceneContext";

@ccclass
export default class Grid extends cc.Component {

    @property(cc.Prefab)
    cellPrefab: cc.Prefab = null;

    onLoad() {
        SceneContext.get(GridController).cellsMatrix;
    }

    public getCellPrefab(): cc.Prefab {
        return this.cellPrefab;
    }

}