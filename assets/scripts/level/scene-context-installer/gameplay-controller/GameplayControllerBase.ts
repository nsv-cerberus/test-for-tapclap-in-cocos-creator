import LevelSettings from "../level-settings/LevelSettings";

const {ccclass} = cc._decorator;

@ccclass
export default abstract class GameplayControllerBase extends cc.Component {

    public abstract init(/* levelSettings: LevelSettings */): void;

}
