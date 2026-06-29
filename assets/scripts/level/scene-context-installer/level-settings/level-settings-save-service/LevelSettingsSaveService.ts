import { LevelSettingsData } from "../LevelSettings";
import ILevelSettingsSaveService from "./ILevelSettingsSaveService";

declare const require: any;
declare const Editor: any;

export default class EditorLevelSettingsSaveService implements ILevelSettingsSaveService {

    private readonly assetDbUrl: string;
    private readonly customFilePath: string;
    private lastJson: string = "";

    constructor(
        assetDbUrl: string = "db://assets/resources/level/levelSettings.json",
        filePath: string = null
    ) {
        this.assetDbUrl = assetDbUrl;
        this.customFilePath = filePath;
    }

    public save(data: LevelSettingsData): void {
        if (!CC_EDITOR) {
            return;
        }

        const editorApi = this.resolveEditorApi();

        if (!editorApi) {
            cc.error("EditorLevelSettingsSaveService: Editor filesystem API is not available.");
            return;
        }

        const json = JSON.stringify(data, null, 2);

        if (json === this.lastJson) {
            return;
        }

        this.lastJson = json;
        const filePath = this.getFilePath(editorApi.path);

        editorApi.fs.mkdirSync(editorApi.path.dirname(filePath), { recursive: true });
        editorApi.fs.writeFileSync(filePath, json, "utf8");

        Editor.assetdb.refresh(this.assetDbUrl);

        cc.log("Level settings saved!");
    }

    private resolveEditorApi(): { fs: any, path: any } {
        if (typeof require !== "function" || typeof Editor === "undefined") {
            return null;
        }

        return {
            fs: require("fs"),
            path: require("path")
        };
    }

    private getFilePath(path: any): string {
        return this.customFilePath || path.join(Editor.Project.path, "assets/resources/level/levelSettings.json");
    }
}
