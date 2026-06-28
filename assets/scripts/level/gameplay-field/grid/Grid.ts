const {ccclass, property, menu} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import CellsMatrixControllerBase from "../../scene-context-installer/cells-matrix-controller/CellsMatrixControllerBase";
import ObjectPoolManager from "../../scene-context-installer/object-pool-manager/ObjectPoolManager";

import GameplayField from "../GameplayField";
import Cell from "./cell/Cell";
import CellBase from "./cell/CellBase";

@ccclass
@menu("Level/Gameplay Field/Grid")
export default class Grid extends cc.Component {

    @property(GameplayField)
    private gameplayFieldEditor: GameplayField;

    private cellsMatrixController: CellsMatrixControllerBase;
    private poolManager: ObjectPoolManager;

    onLoad() {
        this.cellsMatrixController = SceneContext.get(CellsMatrixControllerBase);
        this.poolManager = this.resolvePoolManager();
        this.cellsMatrixController.onInitGrid = this.createCells.bind(this);
    }

    public createCells(cellsMatrixSize: cc.Size): void {
        const rows = cellsMatrixSize.height;
        const cols = cellsMatrixSize.width;

        this.poolManager = this.poolManager || this.resolvePoolManager();

        this.removeExistingCells();

        let cellSize: cc.Size = null;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (!this.poolManager) {
                    cc.error("Grid: ObjectPoolManager is not found!");
                    return;
                }

                const cell = this.poolManager.get(Cell) as CellBase;

                if (!cell) {
                    cc.error("Grid: Cell prefab does not have a Cell component!");
                    return;
                }

                const cellNode = cell.node;
                cellNode.name = `Cell_${row}_${col}`;
                cellNode.parent = this.node;
                cellNode.x = col * cellNode.width;
                cellNode.y = -row * cellNode.height;

                if (!cellSize) {
                    cellSize = new cc.Size(cellNode.width, cellNode.height);
                }

                if (this.cellsMatrixController != null)
                {
                    this.cellsMatrixController.setupCellToMatrix(row, col, cell);
                    cell.setPositionInMatrix(row, col);
                }
            }
        }

        this.gameplayFieldEditor.resize(
            rows,
            cols,
            cellSize || new cc.Size(0, 0)
        );
    }

    public removeExistingCells(): void {
        if (this.node.children.length === 0) {
            return;
        }

        this.poolManager = this.poolManager || this.resolvePoolManager();
        
        const children = this.node.children.slice();

        for (const child of children) {
            if (this.poolManager) {
                this.poolManager.release(Cell.name, child);
            } else {
                child.destroy();
            }
        }
    }

    public getGameplayFieldEditor(): GameplayField {
        return this.gameplayFieldEditor;
    }

    onDestroy() {
        this.removeExistingCells();
    }

    private resolvePoolManager(): ObjectPoolManager {
        try {
            return SceneContext.get(ObjectPoolManager);
        } catch (error) {
            const scene = cc.director.getScene();
            return scene ? scene.getComponentInChildren(ObjectPoolManager) : null;
        }
    }
}
