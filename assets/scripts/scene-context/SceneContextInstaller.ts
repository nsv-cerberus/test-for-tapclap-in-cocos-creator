const { ccclass, property } = cc._decorator;

import CellsController from "./cells-controller/CellsController";
import SceneContext from "./SceneContext";

@ccclass
export class SceneContextInstaller extends cc.Component {
    /* @property({
        type: CellsController,
    })
    cellsController: cc.Node = null; */

    @property({
        type: CellsController,
    })
    cellsController: cc.Node = null;    
    
    private sceneContext: SceneContext;

    onLoad() {
        const cellsController = this.cellsController.getComponent(CellsController);
        this.sceneContext = new SceneContext(cellsController);
    }
}