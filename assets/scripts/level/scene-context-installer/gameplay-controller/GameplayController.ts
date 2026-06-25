const {ccclass, menu} = cc._decorator;

import LevelSettings from "../level-settings/LevelSettings";
import GameplayControllerBase from "./GameplayControllerBase";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Gameplay Controller")
export default class GameplayController extends GameplayControllerBase {

    private levelSettings: LevelSettings = null;

    public init(levelSettings: LevelSettings): void {
        this.levelSettings = levelSettings;
    }

}