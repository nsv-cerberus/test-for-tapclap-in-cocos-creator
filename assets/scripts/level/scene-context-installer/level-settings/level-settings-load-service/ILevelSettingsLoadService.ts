import { LevelSettingsData } from "../LevelSettings";

export default interface ILevelSettingsLoadService {
    load(): Promise<LevelSettingsData>;
}
