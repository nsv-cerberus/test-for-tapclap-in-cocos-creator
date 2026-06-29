const {ccclass, property, menu} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import GameplayControllerBase from "../../scene-context-installer/gameplay-controller/GameplayControllerBase";

@ccclass
@menu("Level/Gameplay Field/Block Input Layer")
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
        cc.log("BlockInputLayer: activate");
        this.blockInputLayer.node.active = true;
    }

    deactivate() {
        cc.log("BlockInputLayer: deactivate");
        this.blockInputLayer.node.active = false;
    }

    onDestroy() {
        const gameplayController = SceneContext.get(GameplayControllerBase);
        
        if (gameplayController) {
            gameplayController.onBlockInput = null;
            gameplayController.onUnblockInput = null;
        }
    }
}
