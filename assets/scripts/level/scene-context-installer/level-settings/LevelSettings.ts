const {ccclass, menu} = cc._decorator;

export type LevelSettingsData = {
    cols: number;
    rows: number;
    minScores: number;
    maxSteps: number;
};

@ccclass
@menu("Level/Scene Context Installer/Level Settings")
export default class LevelSettings extends cc.Component {

    private cols: number = 2;
    private rows: number = 2;
    private minScores: number = 0;
    private maxSteps: number = 0;

    public init() {

    }

    private setSettingsValue(value: LevelSettingsData): void {
        this.cols = value.cols;
        this.rows = value.rows;
        this.minScores = value.minScores;
        this.maxSteps = value.maxSteps;
    }

    public getColsValue(): number {
        return this.cols;
    }

    public getRowsValue(): number {
        return this.rows;
    }

}