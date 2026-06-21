const {ccclass, property, executeInEditMode} = cc._decorator;

import Element from "./Element";

@ccclass
@executeInEditMode()
export default class Cell extends cc.Component {
    
    @property(cc.Node)
    private container: cc.Node = null;

    onLoad() {
        cc.log("Cell: onLoad");
    }

    public addElement(element: Element): void {
        element.node.parent = this.container;
    }
}
