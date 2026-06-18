const {ccclass, property} = cc._decorator;

@ccclass
export default class Cell extends cc.Component {

    @property
    private position: cc.Vec2 = cc.v2(0, 0);

    @property
    private element: cc.Node = null;

    public setPosition(position: cc.Vec2): void {
        this.position = position;
    }

    public setElement(element: cc.Node): void {
        this.element = element;
    }
}
