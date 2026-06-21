const {ccclass, property} = cc._decorator;

import EditorBase from "../../base/EditorBase";
import LevelSettings from "../../scene-context/level-settings/LevelSettings";
import Grid from "./Grid";

@ccclass
export default class GridEditor extends EditorBase {
    
    @property(LevelSettings)
    private levelSettings: LevelSettings = null;

    @property(Grid)
    private grid: Grid = null;

    private lastCols: number = null;
    private lastRows: number = null;
    private lastSpaceBetweenCells: number = null;

    protected override onLoad() {
        super.onLoad();
        
        if (!this.levelSettings) {
            const canvas = this.getScene();
            this.levelSettings = canvas?.getComponentInChildren(LevelSettings);

            if (!this.levelSettings) {
                cc.error("GridEditor: LevelSettings is not assigned!");
            }
        }
    }

    update() {
        if (!CC_EDITOR) {
            this.enabled = false;
            return;
        }
        else {
            if (this.levelSettings && this.grid && this.grid.getGameplayFieldEditor()) {
                if (!this.hasChanged()) {
                    return;
                }

                const rows = this.levelSettings.getRowsValue();
                const cols = this.levelSettings.getColsValue();
                const spaceBetweenCells = this.levelSettings.getSpaceBetweenCellsValue();
                this.grid.createCells(rows, cols, spaceBetweenCells);

                this.saveState();                
                cc.log("GridEditor: Rebuilding grid...");
            }
        }
    }

    private hasChanged(): boolean {
        return (
            this.levelSettings.getColsValue() !== this.lastCols ||
            this.levelSettings.getRowsValue() !== this.lastRows ||
            this.levelSettings.getSpaceBetweenCellsValue() !== this.lastSpaceBetweenCells
        );
    }

    private saveState(): void {
        this.lastCols = this.levelSettings.getColsValue();
        this.lastRows = this.levelSettings.getRowsValue();
        this.lastSpaceBetweenCells = this.levelSettings.getSpaceBetweenCellsValue();
    }
}
