const {ccclass, menu} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import CellsMatrixControllerBase from "../../scene-context-installer/cells-matrix-controller/CellsMatrixControllerBase";
import GameplayControllerBase from "../../scene-context-installer/gameplay-controller/GameplayControllerBase";
import BoosterButtonBase from "./BoosterButtonBase";

@ccclass
@menu("Level/UI/Boosters Panel/Mix Booster Button")
export default class MixBoosterButton extends BoosterButtonBase {

    private isMixing: boolean = false;

    async onClick(): Promise<void> {
        if (this.isMixing) {
            return;
        }

        const gameplayController = SceneContext.get(GameplayControllerBase);

        if (!gameplayController.useMixBooster()) {
            return;
        }

        this.isMixing = true;

        try {
            await SceneContext.get(CellsMatrixControllerBase).mix();
        } finally {
            this.isMixing = false;
        }
    }

}
