const { ccclass, property, executionOrder, menu } = cc._decorator;

import SceneContext from "./SceneContext";

import ObjectPoolManager from "./object-pool-manager/ObjectPoolManager";
import LevelSettings from "./level-settings/LevelSettings";
import CellsMatrixControllerBase from "./cells-matrix-controller/CellsMatrixControllerBase";
import GameplayControllerBase from "./gameplay-controller/GameplayControllerBase";

@ccclass
@executionOrder(-1000)
@menu("Level/Scene Context Installer/Scene Context Installer")
export class SceneContextInstaller extends cc.Component {

    @property(ObjectPoolManager)
    private poolManager: ObjectPoolManager = null;
    
    @property(LevelSettings)
    private levelSettings: LevelSettings = null;

    @property(CellsMatrixControllerBase)
    private cellsMatrixController: CellsMatrixControllerBase = null;

    @property(GameplayControllerBase)
    private gameplayController: GameplayControllerBase = null;
    
    onLoad() {
        cc.log("--- START SCENE CONTEXT INSTALLER ------------------------------------------------------------------");
        cc.debug.setDisplayStats(false);

        this.resolveReferences();

        SceneContext.register(ObjectPoolManager, this.poolManager);
        SceneContext.register(LevelSettings, this.levelSettings);
        SceneContext.register(CellsMatrixControllerBase, this.cellsMatrixController);
        SceneContext.register(GameplayControllerBase, this.gameplayController);

        this.init();
    }

    private async init() {
        await this.levelSettings.init();
        this.cellsMatrixController.init();
        this.gameplayController.init();
    }

    onDestroy() {
        SceneContext.clear();
    }

    private resolveReferences(): void {
        if (!this.poolManager) {
            this.poolManager = this.getComponentInChildren(ObjectPoolManager);
        }

        if (!this.levelSettings) {
            this.levelSettings = this.getComponentInChildren(LevelSettings);
        }

        if (!this.cellsMatrixController) {
            this.cellsMatrixController = this.getComponentInChildren(CellsMatrixControllerBase);
        }

        if (!this.gameplayController) {
            this.gameplayController = this.getComponentInChildren(GameplayControllerBase);
        }
    }
}
