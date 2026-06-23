const {ccclass, menu} = cc._decorator;

type LevelSettingsValue = {
    cols: number;
    rows: number;
    cellSize: cc.Size;
    spaceBetweenCells: number;
};

@ccclass
@menu("Level/Scene Context Installer/Level Settings")
export default class LevelSettings extends cc.Component {

    private cols: number = 2;
    private rows: number = 2;

    private setSettingsValue(value: LevelSettingsValue): void {
        this.cols = value.cols;
        this.rows = value.rows;
    }

    public getColsValue(): number {
        return this.cols;
    }

    public getRowsValue(): number {
        return this.rows;
    }

}