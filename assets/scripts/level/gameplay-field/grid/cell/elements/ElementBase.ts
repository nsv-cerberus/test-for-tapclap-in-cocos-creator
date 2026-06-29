const {ccclass, menu} = cc._decorator;

@ccclass
@menu("Level/Gameplay Field/Grid/Elements/Element Base")
export default abstract class ElementBase extends cc.Component {
    public abstract getType(): ElementBase;
    public abstract resAnimation(): void;
    public abstract destroyAnimation(delay?: number): Promise<void>;
}
