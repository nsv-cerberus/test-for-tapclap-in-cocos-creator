const {ccclass, property, menu} = cc._decorator;

type LevelSettingsValue = {
    cols: number;
    rows: number;
    cellSize: cc.Size;
    spaceBetweenCells: number;
};

@ccclass
@menu("Level/Scene Context/Level Settings")
export default class LevelSettings extends cc.Component {

    @property({
        type: cc.Integer,
        min: 2,
        max: 9,
    })
    private cols: number = 2;

    @property({
        type: cc.Integer,
        min: 2,
        max: 11,
    })
    private rows: number = 2;

    @property({
        type: cc.Integer,
        min: 0,
        max: 50,
    })
    private spaceBetweenCells: number = 0;

    public getColsValue(): number {
        return this.cols;
    }

    public getRowsValue(): number {
        return this.rows;
    }

    public getSpaceBetweenCellsValue(): number {
        return this.spaceBetweenCells;
    }

    // Нужно для того, если будет загрузчик данных из json или другого источника, к которому будет обращаться LevelSettings
    private setSettingsValue(value: LevelSettingsValue): void {
        this.cols = value.cols;
        this.rows = value.rows;
        this.spaceBetweenCells = value.spaceBetweenCells;
    }

}