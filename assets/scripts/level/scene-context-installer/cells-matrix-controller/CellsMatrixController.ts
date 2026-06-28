const {ccclass, menu} = cc._decorator;

import EventBus, { LevelEvent, GameplayEvent } from "../../../EventBus";
import SceneContext from "../SceneContext";

import CellsMatrixControllerBase from "./CellsMatrixControllerBase";
import CellBase from "../../gameplay-field/grid/cell/CellBase";

import LevelSettings from "../level-settings/LevelSettings";

import ICellsMatrix from "./cells-matrix/ICellsMatrix";
import CellsMatrix from "./cells-matrix/CellsMatrix";

import IChainCollectorService from "./chain-collector-service/IChainCollectorService";
import ChainCollectorService from "./chain-collector-service/ChainCollectorService";

import IGravityService from "./gravity-service/IGravityService";
import GravityService from "./gravity-service/GravityService";

import ISpawnService from "./spawn-service/ISpawnService";
import SpawnService from "./spawn-service/SpawnService";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Cells Matrix Controller")
export default class CellsMatrixController extends CellsMatrixControllerBase {

    public onInitGrid: (cellsMatrixSize: cc.Size) => void = null;
    
    private cellsMatrix: ICellsMatrix;
    private chainCollectorService: IChainCollectorService;
    private gravityService: IGravityService;
    private spawnService: ISpawnService;
    
    onLoad() {
        EventBus.on(LevelEvent.LevelSettingsReady, this.createMatrix, this);
        EventBus.on(GameplayEvent.NewGame, this.spawnTails, this);
    }

    public init(): void {
        this.chainCollectorService = new ChainCollectorService(this.cellsMatrix);
        this.gravityService = new GravityService(this.cellsMatrix);
        this.spawnService = new SpawnService();
    }   

    private createMatrix(): void {
        const settings = SceneContext.get(LevelSettings);
        const rows = settings.getRows();
        const cols = settings.getCols();

        this.cellsMatrix = new CellsMatrix(rows, cols);
        this.onInitGrid(this.cellsMatrix.getSizeMatrix());
    }

    public setupCellToMatrix(row: number, col: number, cell: CellBase): void {
        this.cellsMatrix.setupCell(row, col, cell);
    }

    private spawnTails(): void {
        this.spawnService.spawnTails(this.cellsMatrix.getEmptyCells());
    }

    public cellClick(cell: CellBase): void {
        const chain = this.chainCollectorService.collectChains(cell);
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
