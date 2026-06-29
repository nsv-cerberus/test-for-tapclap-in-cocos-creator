const {ccclass, property} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import CellsMatrixControllerBase from "../../scene-context-installer/cells-matrix-controller/CellsMatrixControllerBase";

@ccclass
export default class BlockInputLayer extends cc.Component {
    @property(cc.BlockInputEvents)
    private blockInputLayer: cc.BlockInputEvents = null;

    onLoad() {
        if (!this.blockInputLayer) {
            this.blockInputLayer = this.getComponent(cc.BlockInputEvents);
        }
        
        this.deactivate();

        const cellsMatrixController = SceneContext.get(CellsMatrixControllerBase);
        cellsMatrixController.onBlockInput = this.activate.bind(this);
        cellsMatrixController.onUnblockInput = this.deactivate.bind(this);
    }

    activate() {
        this.blockInputLayer.node.active = true;
    }

    deactivate() {
        this.blockInputLayer.node.active = false;
    }
}
