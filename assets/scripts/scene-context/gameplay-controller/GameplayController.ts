const {ccclass} = cc._decorator;

import EventBus, { GameplayEvent } from "../../EventBus";
import SceneContext from "../SceneContext";
import LevelSettings from "../level-settings/LevelSettings";

import IService from "../IService";
import ICellsMatrix from "./cells-matrix/ICellsMatrix";
import Cell from "../../level/grid/cell/Cell";

@ccclass
export default class GameplayController extends cc.Component implements IService {
    protected cellsMatrix: ICellsMatrix;
    
    public init(cellsMatrix: ICellsMatrix): void {
        this.cellsMatrix = cellsMatrix;
    }

    start() {
        EventBus.emit(GameplayEvent.CreateCells,
            SceneContext.get(LevelSettings).getRowsValue(),
            SceneContext.get(LevelSettings).getColsValue(),
            SceneContext.get(LevelSettings).getSpaceBetweenCellsValue()
        );
    }

    setCellToMatrix(row: number, col: number, cell: Cell): void {
        this.cellsMatrix.setCell(row, col, cell);
    }

    public getCellsMatrix(): ICellsMatrix {
        return this.cellsMatrix;
    }
}