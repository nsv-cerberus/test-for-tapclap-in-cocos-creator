const {ccclass, property, menu} = cc._decorator;

import SceneContext from "../../scene-context-installer/SceneContext";
import CellsMatrixControllerBase from "../../scene-context-installer/cells-matrix-controller/CellsMatrixControllerBase";
import ObjectPoolManager from "../../scene-context-installer/object-pool-manager/ObjectPoolManager";

import GameplayField from "../GameplayField";
import Cell from "./cell/Cell";
import CellBase from "./cell/CellBase";
import ElementBase from "./cell/elements/ElementBase";
import Tile from "./cell/elements/Tile";

@ccclass
@menu("Level/Gameplay Field/Grid/Grid")
export default class Grid extends cc.Component {

    @property(GameplayField)
    private gameplayFieldEditor: GameplayField;

    private cellsMatrixController: CellsMatrixControllerBase;
    private poolManager: ObjectPoolManager;

    onLoad() {
        this.poolManager = this.resolvePoolManager();
        this.removeExistingCells();

        this.cellsMatrixController = SceneContext.get(CellsMatrixControllerBase);
        this.cellsMatrixController.onInitGrid = this.createCells.bind(this);
    }

    public createCells(cellsMatrixSize: cc.Size, fillCellsWithPreviewTiles: boolean = false): void {
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

                if (fillCellsWithPreviewTiles) {
                    this.addPreviewTileToCell(cell);
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
            const cell = child.getComponent(Cell);

            if (cell) {
                this.releaseCellElement(cell);
            }

            if (this.poolManager) {
                this.poolManager.release(Cell.name, child);
            } else {
                child.active = false;
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

    private releaseCellElement(cell: CellBase): void {
        const element = cell.getElement();

        if (!element) {
            return;
        }

        cell.removeElement(element);

        if (this.poolManager) {
            this.poolManager.release(ElementBase.name, element.node);
        } else {
            element.node.active = false;
            element.node.destroy();
        }
    }

    private addPreviewTileToCell(cell: CellBase): void {
        if (!this.poolManager) {
            cc.error("Grid: ObjectPoolManager is not found!");
            return;
        }

        const tile = this.poolManager.get(Tile, ElementBase, false);

        if (!tile) {
            cc.error("Grid: Tile prefab does not have a Tile component!");
            return;
        }

        this.markAsEditorPreview(tile.node);
        cell.addElement(tile as ElementBase);
        tile.node.active = true;
    }

    private markAsEditorPreview(node: cc.Node): void {
        if (!CC_EDITOR) {
            return;
        }

        const flagsEnum = ((cc.Object as any) && (cc.Object as any).Flags) || (cc as any).Flags;

        if (!flagsEnum) {
            return;
        }

        const dontSaveFlag = typeof flagsEnum.DontSave === "number" ? flagsEnum.DontSave : 0;
        const editorOnlyFlag = typeof flagsEnum.EditorOnly === "number" ? flagsEnum.EditorOnly : 0;
        const flags = dontSaveFlag | editorOnlyFlag;

        if (flags === 0) {
            return;
        }

        (node as any)._objFlags |= flags;

        for (const child of node.children) {
            this.markAsEditorPreview(child);
        }
    }
}
