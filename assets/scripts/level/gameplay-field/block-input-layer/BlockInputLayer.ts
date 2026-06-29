const {ccclass, property} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import GameplayControllerBase from "../../scene-context-installer/gameplay-controller/GameplayControllerBase";

@ccclass
export default class BlockInputLayer extends cc.Component {
    @property(cc.BlockInputEvents)
    private blockInputLayer: cc.BlockInputEvents = null;

    onLoad() {
        if (!this.blockInputLayer) {
            this.blockInputLayer = this.getComponent(cc.BlockInputEvents);
        }
        
        this.deactivate();

        const gameplayController = SceneContext.get(GameplayControllerBase);
        gameplayController.onBlockInput = this.activate.bind(this);
        gameplayController.onUnblockInput = this.deactivate.bind(this);
    }

    activate() {        
        this.blockInputLayer.node.active = true;
    }

    deactivate() {
        this.blockInputLayer.node.active = false;
    }
}
