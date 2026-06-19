const {ccclass, property} = cc._decorator;

import Element from "./Element";

@ccclass
export default class Cell extends cc.Component {
    
    @property(cc.Node)
    private container: cc.Node = null;

    onLoad() {
        
    }

    public addElement(element: Element): void {
        element.node.parent = this.container;
    }
}
