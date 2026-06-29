const {ccclass, requireComponent, menu} = cc._decorator;

import TextBase from "../../../base/TextBase";
import EventBus, { GameplayEvent } from "../../../EventBus";
import SceneContext from "../../scene-context-installer/SceneContext";
import GameplayControllerBase from "../../scene-context-installer/gameplay-controller/GameplayControllerBase";

@ccclass
@menu("Level/UI/Statistics Panel/Scores Text")
@requireComponent(cc.RichText)
export default class ScoresText extends TextBase {

    onLoad() {
        super.onLoad();
        EventBus.on(GameplayEvent.ScoresUpdated, this.onScoresUpdated, this);
        this.updateCurrentScores();
    }

    private onScoresUpdated(scores: number, minScores: number): void {
        this.setText(`${scores}/${minScores}`);
    }

    private updateCurrentScores(): void {
        try {
            const gameplayController = SceneContext.get(GameplayControllerBase);
            this.onScoresUpdated(
                gameplayController.getScores(),
                gameplayController.getMinScores()
            );
        } catch (error) {
            return;
        }
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
