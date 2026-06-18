const {ccclass, property, requireComponent} = cc._decorator;

import EditorBase from "../../../base/EditorBase";
import GameplayFieldEditor from "../GameplayFieldEditor";
import Grid from "./Grid";

@ccclass
@requireComponent(Grid)
export default class GridEditor extends EditorBase {    
    
    @property(GameplayFieldEditor)
    private gameplayFieldEditor: GameplayFieldEditor = null;
    
    private grid: Grid = null;
    private lastCols: number = null;
    private lastRows: number = null;
    private lastCellSize: cc.Size = null;
    private lastSpaceBetweenCells: number = null;

    onLoad() {
        if (CC_EDITOR) {
            this.gameplayFieldEditor = this.gameplayFieldEditor || this.node.parent.getComponent(GameplayFieldEditor);
            this.grid = this.node.getComponent(Grid);
        }
    }

    start() {
        if (CC_EDITOR) {
            this.grid = this.node.getComponent(Grid);            
        }
    }

    update() {
        if (CC_EDITOR) {
            if (!this.hasChanged()) {
                return;
            }

            cc.log("GridEditor: Rebuilding grid...");
            this.saveState();
            this.gameplayFieldEditor.resize(this.grid.rowsValue, this.grid.colsValue, this.grid.cellSizeValue, this.grid.spaceBetweenCellsValue);
            this.createCells(this.grid.rowsValue, this.grid.colsValue, this.grid.cellSizeValue, this.grid.spaceBetweenCellsValue);
        }
    }

    private hasChanged(): boolean {
        const cellSize = this.grid.cellSizeValue;

        return (
            this.grid.colsValue !== this.lastCols ||
            this.grid.rowsValue !== this.lastRows ||
            !cellSize.equals(this.lastCellSize) ||
            this.grid.spaceBetweenCellsValue !== this.lastSpaceBetweenCells
        );
    }

    private saveState(): void {
        this.lastCols = this.grid.colsValue;
        this.lastRows = this.grid.rowsValue;
        this.lastCellSize = this.grid.cellSizeValue.clone();
        this.lastSpaceBetweenCells = this.grid.spaceBetweenCellsValue;
    }

    private createCells(rows: number, cols: number, cellSize: cc.Size, spaceBetweenCells: number): void {
        if (this.node.children.length > 0) {
            this.removeExistingCells();
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cellNode = cc.instantiate(this.grid.cellPrefab);
                cellNode.name = `Cell_${row}_${col}`;
                cellNode.parent = this.node;
                cellNode.width = cellSize.width;
                cellNode.height = cellSize.height;
                cellNode.x = col * (cellSize.width + spaceBetweenCells);
                cellNode.y = -row * (cellSize.height + spaceBetweenCells);
            }
        }
    }

    removeExistingCells(): void {
        const children = this.node.children.slice();

        for (const child of children) {
            child.destroy();
        }
    }
}
