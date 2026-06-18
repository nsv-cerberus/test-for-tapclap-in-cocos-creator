const {ccclass, executeInEditMode} = cc._decorator;

import EditorBase from "../../base/EditorBase";

@ccclass
@executeInEditMode()
export default class GameplayFieldEditor extends EditorBase {

    public resize(rows: number, cols: number, cellSize: cc.Size, spaceBetweenCells: number): void {
        this.resizeHeight(rows, cellSize, spaceBetweenCells);
        this.resizeWidth(cols, cellSize, spaceBetweenCells);
    }

    private resizeWidth(cols: number, cellSize: cc.Size, spaceBetweenCells: number): void {
        this.node.width = cols * cellSize.width + (cols - 1) + spaceBetweenCells * (cols - 1);
    }

    private resizeHeight(rows: number, cellSize: cc.Size, spaceBetweenCells: number): void {
        this.node.height = rows * cellSize.height + (rows - 1) + spaceBetweenCells * (rows - 1);
    }

}
