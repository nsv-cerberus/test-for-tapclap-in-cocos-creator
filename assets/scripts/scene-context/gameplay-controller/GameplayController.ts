const {ccclass} = cc._decorator;

import EventBus, { GameplayEvent } from "../../EventBus";
import SceneContext from "../SceneContext";
import LevelSettings from "../level-settings/LevelSettings";

import IService from "../IService";
import ICellsMatrix from "./cells-matrix/ICellsMatrix";
import ICainManager from "./cain-manager/ICainManager";

@ccclass
export default class GameplayController extends cc.Component implements IService {
    protected cellsMatrix: ICellsMatrix;
    protected cainManager: ICainManager;
    
    public init(cellsMatrix: ICellsMatrix, cainManager: ICainManager): void {
        this.cellsMatrix = cellsMatrix;
        this.cainManager = cainManager;
    }

    start() {
        const levelSettings = SceneContext.get(LevelSettings);

        EventBus.emit(GameplayEvent.CreateCells,
            levelSettings.getRowsValue(),
            levelSettings.getColsValue(),
            levelSettings.getSpaceBetweenCellsValue()
        );
    }

    onDestroy() {
        this.cellsMatrix.destroy();
        this.cellsMatrix = null;

        this.cainManager.destroy();
        this.cainManager = null;
    }
}