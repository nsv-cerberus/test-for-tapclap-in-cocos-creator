const { ccclass, property, executionOrder, menu } = cc._decorator;

import SceneContext from "./SceneContext";

import ElementsStore from "./elements-store/ElementsStore";
import PoolManagerController from "./pool-manager/PoolManager";
import LevelSettingsController from "./level-settings/LevelSettings";
import CellsMatrixController from "./cells-matrix-controller/CellsMatrixController";
import GameplayController from "./gameplay-controller/GameplayController";

@ccclass
@executionOrder(-1000)
@menu("Level/Scene Context Installer/Scene Context Installer")
export class SceneContextInstaller extends cc.Component {
    @property(ElementsStore)
    elementsStore: ElementsStore = null;

    @property(PoolManagerController)
    poolManager: PoolManagerController = null;
    
    @property(LevelSettingsController)
    levelSettings: LevelSettingsController = null;

    @property(CellsMatrixController)
    cellsMatrixController: CellsMatrixController = null;

    @property(GameplayController)
    gameplayController: GameplayController = null;
    
    onLoad() {
        SceneContext.register(this.elementsStore);
        SceneContext.register(this.poolManager);
        SceneContext.register(this.levelSettings);
        SceneContext.register(this.cellsMatrixController);
        SceneContext.register(this.gameplayController);
    }

    onDestroy() {
        SceneContext.clear();
    }
}