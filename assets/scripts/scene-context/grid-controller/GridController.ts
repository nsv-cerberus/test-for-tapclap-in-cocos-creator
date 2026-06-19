const {ccclass} = cc._decorator;

import IService from "../IService";
import ICellsMatrix from "./cells-matrix/ICellsMatrix";

@ccclass
export default class GridController extends cc.Component implements IService {
    protected _cellsMatrix: ICellsMatrix;
    
    public init(cellsMatrix: ICellsMatrix): void {
        this._cellsMatrix = cellsMatrix;
    }

    public get cellsMatrix(): ICellsMatrix {
        return this._cellsMatrix;
    }
}