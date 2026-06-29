const {ccclass, menu} = cc._decorator;

import EventBus, { LevelEvent, GameplayEvent } from "../../../EventBus";
import SceneContext from "../SceneContext";

import CellsMatrixControllerBase from "./CellsMatrixControllerBase";
import GameplayControllerBase from "../gameplay-controller/GameplayControllerBase";
import CellBase from "../../gameplay-field/grid/cell/CellBase";
import LevelSettings from "../level-settings/LevelSettings";

import ICellsMatrix from "./cells-matrix/ICellsMatrix";
import CellsMatrix from "./cells-matrix/CellsMatrix";

import IChainCollectorService from "./chain-collector-service/IChainCollectorService";
import ChainCollectorService from "./chain-collector-service/ChainCollectorService";

import IElementsDestroyService from "./elements-destroy-service/IElementsDestroyService";
import ElementsDestroyService from "./elements-destroy-service/ElementsDestroyService";

import IGravityService from "./gravity-service/IGravityService";
import GravityService from "./gravity-service/GravityService";

import ISpawnService from "./spawn-service/ISpawnService";
import SpawnService from "./spawn-service/SpawnService";

import IMixElementsService from "./mix-elements-service/IMixElementsService";
import MixElementsService from "./mix-elements-service/MixElementsService";

import IAvailableMovesService from "./available-moves-service/IAvailableMovesService";
import AvailableMovesService from "./available-moves-service/AvailableMovesService";

@ccclass
@menu("Level/Scene Context Installer/Cells Matrix Controller/Cells Matrix Controller")
export default class CellsMatrixController extends CellsMatrixControllerBase {

    private cellsMatrix: ICellsMatrix;
    private chainCollectorService: IChainCollectorService;
    private elementsDestroyService: IElementsDestroyService;
    private gravityService: IGravityService;
    private spawnService: ISpawnService;
    private mixElementsService: IMixElementsService;
    private availableMovesService: IAvailableMovesService;

    public onInitGrid: (cellsMatrixSize: cc.Size) => void = null;
    
    onLoad() {
        EventBus.on(LevelEvent.LevelSettingsReady, this.createMatrix, this);
        EventBus.on(GameplayEvent.NewGame, this.onNewGame, this);
    }

    public init(): void {
        this.chainCollectorService = new ChainCollectorService(this.cellsMatrix);
        this.gravityService = new GravityService(this.cellsMatrix);
        this.elementsDestroyService = new ElementsDestroyService();
        this.spawnService = new SpawnService();
        this.mixElementsService = new MixElementsService();
        this.mixElementsService.init(this.cellsMatrix.getMatrix());
        this.availableMovesService = new AvailableMovesService(this.cellsMatrix, this.chainCollectorService);
    }   

    private createMatrix(): void {
        const settings = SceneContext.get(LevelSettings);
        const rows = settings.getRows();
        const cols = settings.getCols();

        this.cellsMatrix = new CellsMatrix(rows, cols);

        if (this.onInitGrid) {
            this.onInitGrid(this.cellsMatrix.getSizeMatrix());
        }
    }

    public getMatrixSize(): cc.Size {
        return this.cellsMatrix ? this.cellsMatrix.getSizeMatrix() : null;
    }

    public setupCellToMatrix(row: number, col: number, cell: CellBase): void {
        this.cellsMatrix.setupCell(row, col, cell);
    }

    public async cellClick(cell: CellBase): Promise<void> {
        const levelSettings = SceneContext.get(LevelSettings);
        const chains = this.chainCollectorService.collectChains(cell);
        const chainCellsCount = this.getChainCellsCount(chains);

        if (chainCellsCount < levelSettings.getMinTiles()) {
            return;
        }

        const gameplayController = SceneContext.get(GameplayControllerBase);

        gameplayController.startMove(chainCellsCount);

        await this.destroyFallAndSpawn(chains);

        gameplayController.finishMove(
            this.availableMovesService.hasAvailableMoves(levelSettings.getMinTiles())
        );
    }

    private async destroyFallAndSpawn(chains: CellBase[][]): Promise<void> {
        const emptyCells = await this.elementsDestroyService.destroyCellsElements(chains);

        if (emptyCells.length < 1) {
            return;
        }

        await this.gravityService.fall(emptyCells);
        this.spawnTails();
    }

    private spawnTails(): void {
        this.spawnService.spawnTails(this.cellsMatrix.getEmptyCells());
    }

    private onNewGame(): void {
        this.spawnTails();
    }

    public async mix(): Promise<void> {
        await this.mixElementsService.mix();
    }

    private getChainCellsCount(chains: CellBase[][]): number {
        let count = 0;

        for (const chain of chains) {
            if (!chain) {
                continue;
            }

            count += chain.length;
        }

        return count;
    }

    onDestroy() {
        EventBus.targetOff(this);
    }

}
