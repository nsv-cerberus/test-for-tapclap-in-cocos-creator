const {ccclass} = cc._decorator;

@ccclass
export default class GameplayField extends cc.Component {

    public resize(rows: number, cols: number, cellSize: cc.Size): void {
        this.node.width = cols * cellSize.width + (cols - 1);
        this.node.height = rows * cellSize.height + (rows - 1);
        this.node.setContentSize(this.node.width, this.node.height);
    }
    
}