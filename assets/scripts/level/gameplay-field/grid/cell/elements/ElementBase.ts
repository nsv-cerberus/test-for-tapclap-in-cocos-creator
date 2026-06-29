const {ccclass} = cc._decorator;

@ccclass
export default abstract class ElementBase extends cc.Component {
    public abstract getType(): ElementBase;
    public abstract resAnimation(): void;
    public abstract destroyAnimation(delay?: number): Promise<void>;
}
