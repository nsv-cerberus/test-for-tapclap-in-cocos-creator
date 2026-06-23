const {ccclass, property, menu} = cc._decorator;

import GameplayField from "../GameplayField";
import EventBus, { GameplayEvent } from "../../../EventBus";

@ccclass
@menu("Level/Gameplay Field/Grid")
export default class Grid extends cc.Component {

    @property(GameplayField)
    private gameplayFieldEditor: GameplayField = null;

    @property(cc.Prefab)
    cellPrefab: cc.Prefab = null;

    onLoad() {
        if (!this.cellPrefab) {
            cc.error("Grid: Cell prefab is not assigned!");
        }
    }

    onEnable() {}

    public createCells(rows: number, cols: number): void {
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
        EventBus.targetOff(this);
    }
}