const {ccclass, property, menu} = cc._decorator;

import EditorBase from "../../../base/EditorBase";
import { LevelSettingsData } from "./LevelSettings";

declare const require: any;
declare const Editor: any;
const fs = require("fs");
const path = require("path");

@ccclass
@menu("Level/Scene Context Installer/Editors/Level Settings Editor")
export default class LevelSettingsEditor extends EditorBase {

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
    })
    private minScores: number = 0;

    @property({
        type: cc.Integer,
        min: 0,
    })
    private maxSteps: number = 0;

    private lastCols: number = null;
    private lastRows: number = null;
    private lastMinScores: number = null;
    private lastMaxSteps: number = null;

    private data: LevelSettingsData = null;
    private lastJson: string = "";

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
            this.maxSteps !== this.lastMaxSteps
        );
    }

    private saveState(): void {
        this.lastCols = this.cols;
        this.lastRows = this.rows;
        this.lastMinScores = this.minScores;
        this.lastMaxSteps = this.maxSteps;
    }

    private saveLevelSettings(): void {
        this.data = {
            cols: this.cols,
            rows: this.rows,
            minScores: this.minScores,
            maxSteps: this.maxSteps,
        };

        const json = JSON.stringify(this.data, null, 2);

        if (json === this.lastJson) {
            return;
        }

        this.lastJson = json;
        this.saveLevelJson(json);
    }

    private saveLevelJson(json: string): void {
        if (!CC_EDITOR) {
            return;
        }

        const filePath = path.join(Editor.Project.path, "assets/resources/level/levelSettings.json");

        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, json, "utf8");

        cc.log("Level settings saved:", filePath);
    }

    public getColsValue(): number {
        return this.cols;
    }

    public getRowsValue(): number {
        return this.rows;
    }

}
