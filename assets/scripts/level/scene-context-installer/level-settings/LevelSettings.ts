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
    private minScores: number = 20;
    private maxSteps: number = 10;

    public async init() {
        const asset = await this.loadLevelSettings();
        this.setSettingsValue(asset.json as LevelSettingsData);
    }

    private async loadLevelSettings(): Promise<cc.JsonAsset> {
        return await new Promise((resolve, reject) => {
            cc.resources.load("level/levelSettings", cc.JsonAsset, (err: Error, asset: cc.JsonAsset) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(asset);
                    cc.warn("JSON: ", JSON.stringify(asset.json, null, 2));
                }
            );
        });
    }

    private setSettingsValue(value: LevelSettingsData): void {
        cc.warn("LevelSettings setSettingsValue: ", value.cols, value.rows, value.minScores, value.maxSteps);
        this.cols = value.cols;
        this.rows = value.rows;
        this.minScores = value.minScores;
        this.maxSteps = value.maxSteps;
    }

    public getCols(): number {
        return this.cols;
    }

    public getRows(): number {
        return this.rows;
    }

    public getMinScores(): number {
        return this.minScores;
    }

    public getMaxSteps(): number {
        return this.maxSteps;
    }

}