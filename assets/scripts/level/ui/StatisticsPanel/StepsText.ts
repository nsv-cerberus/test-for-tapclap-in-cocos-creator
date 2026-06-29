const {ccclass, requireComponent} = cc._decorator;

import TextBase from "../../../base/TextBase";
import EventBus, { GameplayEvent } from "../../../EventBus";
import SceneContext from "../../scene-context-installer/SceneContext";
import GameplayControllerBase from "../../scene-context-installer/gameplay-controller/GameplayControllerBase";

@ccclass
@requireComponent(cc.RichText)
export default class StepsText extends TextBase {

    onLoad() {
        super.onLoad();
        EventBus.on(GameplayEvent.StepsUpdated, this.onStepsUpdated, this);
        this.updateCurrentSteps();
    }

    private onStepsUpdated(steps: number): void {
        this.setText(steps.toString());
    }

    private updateCurrentSteps(): void {
        try {
            const gameplayController = SceneContext.get(GameplayControllerBase);
            this.onStepsUpdated(gameplayController.getSteps());
        } catch (error) {
            return;
        }
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
