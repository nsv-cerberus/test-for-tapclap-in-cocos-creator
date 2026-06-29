const {ccclass, property, menu} = cc._decorator;

import EditorBase from "../../../base/EditorBase";
import { LevelSettingsData } from "./LevelSettings";
import ILevelSettingsSaveService from "./level-settings-save-service/ILevelSettingsSaveService";
import EditorLevelSettingsSaveService from "./level-settings-save-service/LevelSettingsSaveService";

@ccclass
@menu("Level/Scene Context Installer/Level Settings/Level Settings Editor")
export default class LevelSettingsEditor extends EditorBase {
    
    @property({
        type: cc.Integer,
        min: 3,
        max: 9,
    })
    private cols: number = 3;

    @property({
        type: cc.Integer,
        min: 3,
        max: 9,
    })
    private rows: number = 3;

    @property({
        type: cc.Integer,
        min: 20,
    })
    private minScores: number = 20;

    @property({
        type: cc.Integer,
        min: 10,
    })
    private maxSteps: number = 10;

    @property({
        type: cc.Integer,
        min: 1,
    })
    private tileScore: number = 1;

    @property({
        type: cc.Integer,
        min: 3,
    })
    private minTiles: number = 3;

    @property({
        type: cc.Integer,
        min: 3,
    })
    private mixBoosterCount: number = 3;

    private lastCols: number;
    private lastRows: number;
    private lastMinScores: number;
    private lastMaxSteps: number;
    private lastTileScore: number;
    private lastMinTiles: number;
    private lastMixBoosterCount: number;

    private saveService: ILevelSettingsSaveService = new EditorLevelSettingsSaveService();

    protected update(): void {
        if (!this.hasChanged()) {
            return;
        }

        this.saveState();
        this.saveLevelSettings();
    }

    private hasChanged(): boolean {
        return (
            this.cols !== this.lastCols ||
            this.rows !== this.lastRows ||
            this.minScores !== this.lastMinScores ||
            this.maxSteps !== this.lastMaxSteps ||
            this.tileScore !== this.lastTileScore ||
            this.minTiles !== this.lastMinTiles ||
            this.mixBoosterCount !== this.lastMixBoosterCount
        );
    }

    private saveState(): void {
        this.lastCols = this.cols;
        this.lastRows = this.rows;
        this.lastMinScores = this.minScores;
        this.lastMaxSteps = this.maxSteps;
        this.lastTileScore = this.tileScore;
        this.lastMinTiles = this.minTiles;
        this.lastMixBoosterCount = this.mixBoosterCount;
    }

    private saveLevelSettings(): void {
        const data: LevelSettingsData = {
            cols: this.cols,
            rows: this.rows,
            minScores: this.minScores,
            maxSteps: this.maxSteps,
            tileScore: this.tileScore,
            minTiles: this.minTiles,
            mixBoosterCount: this.mixBoosterCount,
        };

        this.saveService.save(data);
    }

    public setSaveService(saveService: ILevelSettingsSaveService): void {
        this.saveService = saveService;
    }

    public getColsValue(): number {
        return this.cols;
    }

    public getRowsValue(): number {
        return this.rows;
    }

    public getMatrixSize(): cc.Size {
        return new cc.Size(this.cols, this.rows);
    }

}
