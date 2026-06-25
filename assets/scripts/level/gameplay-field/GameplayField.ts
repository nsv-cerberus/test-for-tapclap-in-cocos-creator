const {ccclass} = cc._decorator;

@ccclass
export default class GameplayField extends cc.Component {

    public resize(rows: number, cols: number, cellSize: cc.Size): void {
        cc.log("Resize Gameplay Field: ", rows, cols, cellSize.width, cellSize.height);
        this.resizeHeight(rows, cellSize);
        this.resizeWidth(cols, cellSize);
    }
    
    private resizeWidth(cols: number, cellSize: cc.Size): void {
        this.node.width = cols * cellSize.width + (cols - 1);
        cc.log("GameplayField: resizeWidth: ", this.node.width);
    }

    private resizeHeight(rows: number, cellSize: cc.Size): void {
        this.node.height = rows * cellSize.height + (rows - 1);
        cc.log("GameplayField: resizeHeight: ", this.node.height);
    }
    
}