const {ccclass, property, menu} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import CellsMatrixControllerBase from "../../scene-context-installer/cells-matrix-controller/CellsMatrixControllerBase";

import GameplayField from "../GameplayField";

@ccclass
@menu("Level/Gameplay Field/Grid")
export default class Grid extends cc.Component {

    @property(GameplayField)
    private gameplayFieldEditor: GameplayField;

    @property(cc.Prefab)
    cellPrefab: cc.Prefab;

    private cellsMatrixController: CellsMatrixControllerBase;

    onLoad() {
        this.cellsMatrixController = SceneContext.get(CellsMatrixControllerBase);
        this.cellsMatrixController.initGrid = this.createCells.bind(this);
    }

    start() {
        /* if (!this.cellPrefab) {
            cc.error("Grid: Cell prefab is not assigned!");
        }

        this.cellsMatrixController = SceneContext.get(CellsMatrixControllerBase);

        const sizeMatrix = this.cellsMatrixController.getSizeMatrix();
        this.createCells(sizeMatrix.height, sizeMatrix.width); */
    }

    public createCells(cellsMatrixSize: cc.Size): void {
        const rows = cellsMatrixSize.height;
        const cols = cellsMatrixSize.width;

        if (!this.cellPrefab) {
            cc.error("Grid: Cell prefab is not assigned!");
            return;
        }

        this.removeExistingCells();

        const cellComponent = this.cellPrefab.data.getComponent("Cell");
        if (cellComponent == null) {
            cc.error("Grid: Cell prefab does not have a Cell component!");
            return;
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cellNode = cc.instantiate(this.cellPrefab);
                cellNode.name = `Cell_${row}_${col}`;
                cellNode.parent = this.node;
                cellNode.x = col * cellNode.width;
                cellNode.y = -row * cellNode.height;

                if (this.cellsMatrixController != null)
                {
                    this.cellsMatrixController.setupCellToMatrix(row, col, cellNode.getComponent("Cell"));
                }
            }
        }

        this.gameplayFieldEditor.resize(
            rows, 
            cols, 
            new cc.Size(this.cellPrefab.data.width, this.cellPrefab.data.height)
        );
    }

    public removeExistingCells(): void {
        if (this.node.children.length === 0) {
            return;
        }
        
        const children = this.node.children.slice();

        for (const child of children) {
            child.destroy();
        }
    }

    public getCellPrefab(): cc.Prefab {
        return this.cellPrefab;
    }

    public getGameplayFieldEditor(): GameplayField {
        return this.gameplayFieldEditor;
    }

    onDestroy() {
        this.removeExistingCells();
        /* EventBus.targetOff(this); */
    }
}