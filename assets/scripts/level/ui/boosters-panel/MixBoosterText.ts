const {ccclass, requireComponent, menu} = cc._decorator;

import TextBase from "../../../base/TextBase";
import EventBus, { GameplayEvent } from "../../../EventBus";
import SceneContext from "../../scene-context-installer/SceneContext";
import GameplayControllerBase from "../../scene-context-installer/gameplay-controller/GameplayControllerBase";

@ccclass
@menu("Level/UI/Boosters Panel/Mix Booster Text")
@requireComponent(cc.RichText)
export default class MixBoosterText extends TextBase {

    onLoad() {
        super.onLoad();
        EventBus.on(GameplayEvent.MixBoostersUpdated, this.onMixBoostersUpdated, this);
        this.updateCurrentMixBoosters();
    }

    private onMixBoostersUpdated(count: number): void {
        this.setText(count.toString());
    }

    private updateCurrentMixBoosters(): void {
        try {
            const gameplayController = SceneContext.get(GameplayControllerBase);
            this.onMixBoostersUpdated(gameplayController.getMixBoosterCount());
        } catch (error) {
            return;
        }
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
