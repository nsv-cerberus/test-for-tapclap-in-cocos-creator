const {ccclass, menu} = cc._decorator;

import EventBus, { GameplayEvent } from "../../../EventBus";
import SceneContext from "../SceneContext";
import LevelSettingsController from "../level-settings/LevelSettings";

import ICellsMatrix from "./cells-matrix/ICellsMatrix";
import CellsMatrix from "./cells-matrix/CellsMatrix";

import ICellsInputService from "./cells-input-service/ICellsInputService";
import CellsInputService from "./cells-input-service/CellsInputService";

import IChainCollectorService from "./chain-collector-service/IChainCollectorService";
import ChainCollectorService from "./chain-collector-service/ChainCollectorService";

import IGravityService from "./gravity-service/IGravityService";
import GravityService from "./gravity-service/GravityService";

import ISpawnService from "./spawn-service/ISpawnService";
import SpawnService from "./spawn-service/SpawnService";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Cells Matrix Controller")
export default class CellsMatrixController extends cc.Component {

    private cellsMatrix: ICellsMatrix;
    private cellsInputService: ICellsInputService;
    private chainCollectorService: IChainCollectorService;
    private gravityService: IGravityService;
    private spawnService: ISpawnService;
        
    onLoad() {
        const levelSettings = SceneContext.get(LevelSettingsController);
        this.cellsMatrix = new CellsMatrix(levelSettings.getRowsValue(), levelSettings.getColsValue());
        this.cellsInputService = new CellsInputService(this.cellsMatrix);
        this.chainCollectorService = new ChainCollectorService(this.cellsMatrix);
        this.gravityService = new GravityService(this.cellsMatrix);
        this.spawnService = new SpawnService();

        this.subscribeToEvents();
    }

    private subscribeToEvents(): void {
        EventBus.on(GameplayEvent.StartGame, this.handleStartGame, this);
    }

    private handleStartGame(): void {
        this.cellsMatrix.clearMatrix();
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
