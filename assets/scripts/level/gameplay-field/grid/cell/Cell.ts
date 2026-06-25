const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("Level/Grid/Cell")
export default class Cell extends cc.Component {
    
    @property(cc.Node)
    private container: cc.Node = null;

    onLoad() {
        cc.log("Cell: onLoad");
    }

    public click(): void {
        cc.log("Cell: click: " + this.node.name);
    }

    private addElement(element: Element): void {
        /* element.node.parent = this.container; */
    }

    private removeElement(element: Element): void {
        /* if (element.node.parent === this.container) {
            element.node.parent = null;
        } */
    }
    
}