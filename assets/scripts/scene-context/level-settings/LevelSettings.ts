const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("Level/Scene Context/LevelSettings")
export default class LevelSettings extends cc.Component {

    @property({
        type: cc.Integer,
        min: 2,
    })
    private cols: number = 2;

    @property({
        type: cc.Integer,
        min: 2,
    })
    private rows: number = 2;

    @property
    private cellSize: cc.Size = cc.size(100, 112);

    @property({
        type: cc.Integer,
        min: 0,
        max: 50,
    })
    private spaceBetweenCells: number = 0;

    public get colsValue(): number {
        return this.cols;
    }

    public get rowsValue(): number {
        return this.rows;
    }

    public get cellSizeValue(): cc.Size {
        return this.cellSize;
    }

    public get spaceBetweenCellsValue(): number {
        return this.spaceBetweenCells;
    }

}
