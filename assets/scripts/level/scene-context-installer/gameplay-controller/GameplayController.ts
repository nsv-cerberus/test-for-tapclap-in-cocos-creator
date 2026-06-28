const {ccclass, menu} = cc._decorator;

import EventBus, { GameplayEvent, LevelEvent } from "../../../EventBus";
import SceneContext from "../SceneContext";
import LevelSettings from "../level-settings/LevelSettings";
import GameplayControllerBase from "./GameplayControllerBase";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Gameplay Controller")
export default class GameplayController extends GameplayControllerBase {

    private levelSettings: LevelSettings = null;

    onLoad() {
        EventBus.on(LevelEvent.GridInitialized, this.onNewGame, this);
    }

    public init(/* levelSettings: LevelSettings */): void {
        this.levelSettings = SceneContext.get(LevelSettings);
        EventBus.emit(GameplayEvent.NewGame, this);
    }

    private onNewGame(): void {
        EventBus.emit(GameplayEvent.NewGame, this);
    }

    onDisable() {
        EventBus.targetOff(this);
    }

}