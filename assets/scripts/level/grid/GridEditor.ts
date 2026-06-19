const {ccclass, property} = cc._decorator;

import EditorBase from "../../base/EditorBase";
import LevelSettings from "../../scene-context/level-settings/LevelSettings";
import Grid from "./Grid";
import GameplayFieldEditor from "./GameplayFieldEditor";

@ccclass
export default class GridEditor extends EditorBase {
    
    @property(LevelSettings)
    private levelSettings: LevelSettings = null;

    @property(Grid)
    private grid: Grid = null;

    @property(GameplayFieldEditor)
    private gameplayFieldEditor: GameplayFieldEditor = null;

    private lastCols: number = null;
    private lastRows: number = null;
    private lastCellSize: cc.Size = null;
    private lastSpaceBetweenCells: number = null;

    update() {
        if (CC_EDITOR) {
            if (this.levelSettings && this.grid && this.gameplayFieldEditor) {
                if (!this.hasChanged()) {
                    return;
                }

                const cellNode = cc.instantiate(this.grid.getCellPrefab());
                const rows = this.levelSettings.rowsValue;
                const cols = this.levelSettings.colsValue;
                const cellSize = new cc.Size(cellNode.width, cellNode.height);
                const spaceBetweenCells = this.levelSettings.spaceBetweenCellsValue;
    
                this.saveState();
                this.gameplayFieldEditor.resize(rows, cols, cellSize, spaceBetweenCells);
                this.createCells(rows, cols, spaceBetweenCells);
                
                cc.log("GridEditor: Rebuilding grid...");
            }
        }
    }

    private hasChanged(): boolean {
        const cellSize = this.levelSettings.cellSizeValue;

        return (
            this.levelSettings.colsValue !== this.lastCols ||
            this.levelSettings.rowsValue !== this.lastRows ||
            !cellSize.equals(this.lastCellSize) ||
            this.levelSettings.spaceBetweenCellsValue !== this.lastSpaceBetweenCells
        );
    }

    private saveState(): void {
        this.lastCols = this.levelSettings.colsValue;
        this.lastRows = this.levelSettings.rowsValue;
        this.lastCellSize = this.levelSettings.cellSizeValue.clone();
        this.lastSpaceBetweenCells = this.levelSettings.spaceBetweenCellsValue;
    }

    private createCells(rows: number, cols: number, spaceBetweenCells: number): void {
        if (this.node.children.length > 0) {
            this.removeExistingCells();
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cellNode = cc.instantiate(this.grid.getCellPrefab());
                cellNode.name = `Cell_${row}_${col}`;
                cellNode.parent = this.node;
                cellNode.x = col * (cellNode.width + spaceBetweenCells);
                cellNode.y = -row * (cellNode.height + spaceBetweenCells);
            }
        }
    }

    private removeExistingCells(): void {
        const children = this.node.children.slice();

        for (const child of children) {
            child.destroy();
        }
    }
}
