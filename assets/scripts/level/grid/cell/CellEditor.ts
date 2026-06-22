const {ccclass, property, executeInEditMode, menu, requireComponent} = cc._decorator;

import EditorBase from "../../../base/EditorBase";
import Cell from "./Cell";

@ccclass
@executeInEditMode()
@menu("Level/Grid/Cell Editor")
@requireComponent(Cell)
export default class CellEditor extends EditorBase {

    @property(Cell)
    private cell: Cell = null;

    onLoad() {
        super.onLoad();

        if (this.cell == null) {
            this.cell = this.getComponent(Cell);
        }
    }
    
}