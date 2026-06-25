const { ccclass, property, executionOrder, menu } = cc._decorator;

import EventBus, { GameplayEvent } from "../../EventBus";
import SceneContext from "./SceneContext";

import ElementsStore from "./elements-store/ElementsStore";
import PoolManager from "./pool-manager/PoolManager";
import LevelSettings from "./level-settings/LevelSettings";
import CellsMatrixControllerBase from "./cells-matrix-controller/CellsMatrixControllerBase";
import GameplayControllerBase from "./gameplay-controller/GameplayControllerBase";

@ccclass
@executionOrder(-1000)
@menu("Level/Scene Context Installer/Scene Context Installer")
export class SceneContextInstaller extends cc.Component {
    @property(ElementsStore)
    private elementsStore: ElementsStore = null;

    @property(PoolManager)
    private poolManager: PoolManager = null;
    
    @property(LevelSettings)
    private levelSettings: LevelSettings = null;

    @property(CellsMatrixControllerBase)
    private cellsMatrixController: CellsMatrixControllerBase = null;

    @property(GameplayControllerBase)
    private gameplayController: GameplayControllerBase = null;
    
    onLoad() {
        SceneContext.register(CellsMatrixControllerBase, this.cellsMatrixController);
        SceneContext.register(GameplayControllerBase, this.gameplayController);

        this.init();
    }

    private async init() {
        this.poolManager.init(this.elementsStore);
        await this.levelSettings.init();
        this.cellsMatrixController.init(this.poolManager, this.levelSettings);
        this.gameplayController.init(this.levelSettings);
    }

    onDestroy() {
        SceneContext.clear();
    }
}