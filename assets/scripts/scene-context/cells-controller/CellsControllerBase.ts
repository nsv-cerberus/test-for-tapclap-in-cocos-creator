const {ccclass, property} = cc._decorator;

import ICellsMatrix from "./cells-matrix/ICellsMatrix";

@ccclass
export default abstract class CellsControllerBase extends cc.Component {

    protected cellsMatrix: ICellsMatrix = null;

    init(cellsMatrix: ICellsMatrix) {
        this.cellsMatrix = cellsMatrix;
    }
    
}