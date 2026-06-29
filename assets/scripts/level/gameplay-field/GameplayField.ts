const {ccclass, menu} = cc._decorator;

@ccclass
@menu("Level/Gameplay Field/Gameplay Field")
export default class GameplayField extends cc.Component {

    public resize(rows: number, cols: number, cellSize: cc.Size): void {
        this.node.width = cols * cellSize.width + (cols - 1);
        this.node.height = rows * cellSize.height + (rows - 1);
        this.node.setContentSize(this.node.width, this.node.height);
    }
    
}
