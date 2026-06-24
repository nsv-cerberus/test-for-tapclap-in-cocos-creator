const { ccclass, property, executionOrder, menu } = cc._decorator;

import EventBus, { GameplayEvent } from "../../EventBus";
import SceneContext from "./SceneContext";

import ElementsStore from "./elements-store/ElementsStore";
import PoolManager from "./pool-manager/PoolManager";
import LevelSettings from "./level-settings/LevelSettings";
import CellsMatrixControllerBase from "./cells-matrix-controller/CellsMatrixControllerBase";
import GameplayController from "./gameplay-controller/GameplayController";

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

    @property(GameplayController)
    private gameplayController: GameplayController = null;
    
    onLoad() {
        /* SceneContext.register(this.poolManager);
        SceneContext.register(this.levelSettings); */
        SceneContext.register(CellsMatrixControllerBase, this.cellsMatrixController);
        /* SceneContext.register(this.gameplayController); */

        cc.warn("SceneContextInstaller onLoad!");
        this.init();
    }

    private async init() {
        this.poolManager.init(this.elementsStore);
        await this.levelSettings.init();
        this.cellsMatrixController.init(this.poolManager, this.levelSettings);
    }

    /* start() {
        EventBus.emit(GameplayEvent.StartGame); // это должно быть в GameplayController, а не в SceneContextInstaller
    } */

    onDestroy() {
        SceneContext.clear();
    }
}