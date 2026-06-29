const { ccclass, property, menu} = cc._decorator;

import SceneContext from "../../../scene-context-installer/SceneContext";
import CellsMatrixControllerBase from "../../../scene-context-installer/cells-matrix-controller/CellsMatrixControllerBase";
import CellBase from "./CellBase";
import ElementBase from "./elements/ElementBase";

@ccclass
@menu("Level/Grid/Cell")
export default class Cell extends CellBase {
    
    @property(cc.Node)
    private container: cc.Node = null;

    private element: ElementBase = null;
    private row: number = -1;
    private col: number = -1;

    public setPositionInMatrix(row: number, col: number): CellBase {
        this.row = row;
        this.col = col;
        return this;
    }   

    public getPositionInMatrix(): { row: number, col: number } {
        return { 
            row: this.row,
            col: this.col 
        };
    }

    public getElement(): ElementBase {
        return this.element;
    }

    private click(): void {
        SceneContext.get(CellsMatrixControllerBase).cellClick(this);
    }

    public addElement(element: ElementBase): void {
        element.node.parent = this.container;
        this.element = element;
    }

    public removeElement(element: ElementBase): void {
        if (this.element === element) {
            if (this.element.node.parent === this.container) {
                this.element.node.parent = null;
            }

            this.element = null;
        }
    }
    
}
