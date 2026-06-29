import EventBus, { LevelEvent } from "../../../EventBus";
import ILevelSettingsLoadService from "./level-settings-load-service/ILevelSettingsLoadService";
import LevelSettingsLoadService from "./level-settings-load-service/LevelSettingsLoadService";

const {ccclass, menu} = cc._decorator;

export type LevelSettingsData = {
    cols: number;
    rows: number;
    minScores: number;
    maxSteps: number;
    tileScore: number;
    minTiles: number;
};


@ccclass
@menu("Level/Scene Context Installer/Level Settings")
export default class LevelSettings extends cc.Component {
    
    private cols: number = 2;
    private rows: number = 2;
    private minScores: number = 20;
    private maxSteps: number = 10;
    private tileScore: number = 1;
    private minTiles: number = 3;

    private loadService: ILevelSettingsLoadService = new LevelSettingsLoadService();

    public async init() {
        const data = await this.loadService.load();
        this.setSettingsValue(data);
    }

    public setLoadService(loadService: ILevelSettingsLoadService): void {
        this.loadService = loadService;
    }

    private setSettingsValue(value: LevelSettingsData): void {
        this.cols = value.cols;
        this.rows = value.rows;
        this.minScores = value.minScores;
        this.maxSteps = value.maxSteps;
        this.tileScore = value.tileScore;
        this.minTiles = value.minTiles;

        EventBus.emit(LevelEvent.LevelSettingsReady, this);
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

    public getTileScore(): number {
        return this.tileScore;
    }

    public getMinTiles(): number {
        return this.minTiles;
    }

}