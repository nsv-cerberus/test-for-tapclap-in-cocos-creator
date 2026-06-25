const {ccclass, menu} = cc._decorator;

import EventBus, { GameplayEvent } from "../../../EventBus";
import CellsMatrixControllerBase from "./CellsMatrixControllerBase";
import Cell from "../../gameplay-field/grid/cell/Cell";

import LevelSettings from "../level-settings/LevelSettings";
import PoolManager from "../pool-manager/PoolManager";

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
export default class CellsMatrixController extends CellsMatrixControllerBase {

    private cellsMatrix: ICellsMatrix;
    private cellsInputService: ICellsInputService;
    private chainCollectorService: IChainCollectorService;
    private gravityService: IGravityService;
    private spawnService: ISpawnService;
        
    init(poolManager: PoolManager, levelSettings: LevelSettings): void {
        this.cellsMatrix = new CellsMatrix(levelSettings.getRows(), levelSettings.getCols());
        this.cellsInputService = new CellsInputService(this.cellsMatrix);
        this.chainCollectorService = new ChainCollectorService(this.cellsMatrix);
        this.gravityService = new GravityService(this.cellsMatrix);
        this.spawnService = new SpawnService(poolManager);
    }

    start() {
        this.initGrid(this.cellsMatrix.getSizeMatrix());
    }

    public initGrid: (cellsMatrixSize: cc.Size) => void = null;

    /* private handleStartGame(): void {
        this.cellsMatrix.clearMatrix();
    } */

    public setupCellToMatrix(row: number, col: number, cell: Cell): void {
        this.cellsMatrix.setupCell(row, col, cell);
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
