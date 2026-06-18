const {ccclass, property} = cc._decorator;

import CellsController from "../../../scene-context/cells-controller/CellsController";
import SceneContext from "../../../scene-context/SceneContext";

@ccclass
export default class Grid extends cc.Component {

    @property(cc.Prefab)
    cell: cc.Prefab = null;

    @property({
        type: cc.Integer,
        min: 2,
        max: 9,
        call: function (newValue: number, oldValue: number) {
            if (newValue === oldValue) {
                return;
            }
            cc.warn("Cols value changed. Please, rebuild the grid to apply changes.");
        }
    })
    private cols: number = 2;

    @property({
        type: cc.Integer,
        min: 2,
        max: 11,
    })
    private rows: number = 2;

    @property
    private cellSize: cc.Size = cc.size(100, 112);

    @property({
        type: cc.Integer,
        min: 0,
        max: 50,
    })
    private spaceBetweenCells: number = 0;

    private gridController: CellsController;

    onLoad() {
        this.gridController = SceneContext.get(CellsController);
    }

    public get cellPrefab(): cc.Prefab {
        return this.cell;
    }    

    public get colsValue(): number {
        return this.cols;
    }

    public get rowsValue(): number {
        return this.rows;
    }

    public get cellSizeValue(): cc.Size {
        return this.cellSize;
    }

    public get spaceBetweenCellsValue(): number {
        return this.spaceBetweenCells;
    }

}