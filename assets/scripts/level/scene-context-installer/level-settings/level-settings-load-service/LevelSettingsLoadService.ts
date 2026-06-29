import { LevelSettingsData } from "../LevelSettings";
import ILevelSettingsLoadService from "./ILevelSettingsLoadService";

export default class LevelSettingsLoadService implements ILevelSettingsLoadService {

    private readonly resourcePath: string;

    constructor(resourcePath: string = "level/levelSettings") {
        this.resourcePath = resourcePath;
    }

    public async load(): Promise<LevelSettingsData> {
        const asset = await this.loadJsonAsset();
        return asset.json as LevelSettingsData;
    }

    private loadJsonAsset(): Promise<cc.JsonAsset> {
        return new Promise<cc.JsonAsset>((resolve, reject) => {
            cc.resources.load(this.resourcePath, cc.JsonAsset, (err: Error, asset: cc.JsonAsset) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(asset);
            });
        });
    }
}
