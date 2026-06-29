import { LevelSettingsData } from "../LevelSettings";

export default interface ILevelSettingsSaveService {
    save(data: LevelSettingsData): void;
}
