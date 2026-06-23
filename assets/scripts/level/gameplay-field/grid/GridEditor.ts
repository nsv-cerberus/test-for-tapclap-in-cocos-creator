const {ccclass, property, requireComponent} = cc._decorator;

import EditorBase from "../../../base/EditorBase";
import LevelSettingsEditor from "../../scene-context-installer/level-settings/LevelSettingsEditor";
import Grid from "./Grid";

@ccclass
@requireComponent(Grid)
export default class GridEditor extends EditorBase {
    
    @property(LevelSettingsEditor)
    private levelSettings: LevelSettingsEditor = null;

    @property(Grid)
    private grid: Grid = null;

    private lastCols: number = null;
    private lastRows: number = null;

    protected override onLoad() {
        super.onLoad();
        
        if (!this.levelSettings) {
            const canvas = this.getScene();
            this.levelSettings = canvas?.getComponentInChildren(LevelSettingsEditor);

            if (!this.levelSettings) {
                cc.error("GridEditor: LevelSettingsEditor is not assigned!");
            }
        }
    }

    update() {
        if (this.levelSettings && this.grid && this.grid.getGameplayFieldEditor()) {
            if (!this.hasChanged()) {
                return;
            }

            const rows = this.levelSettings.getRowsValue();
            const cols = this.levelSettings.getColsValue();
            this.grid.createCells(rows, cols);

            this.saveState();                
            cc.log("GridEditor: Rebuilding grid...");
        }
    }

    private hasChanged(): boolean {
        return (
            this.levelSettings.getColsValue() !== this.lastCols ||
            this.levelSettings.getRowsValue() !== this.lastRows 
        );
    }

    private saveState(): void {
        this.lastCols = this.levelSettings.getColsValue();
        this.lastRows = this.levelSettings.getRowsValue();
    }
}
