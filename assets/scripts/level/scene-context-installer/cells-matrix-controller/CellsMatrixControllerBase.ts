import Cell from "../../gameplay-field/grid/cell/Cell";
import CellBase from "../../gameplay-field/grid/cell/CellBase";

export default abstract class CellsMatrixControllerBase extends cc.Component {
    public abstract onInitGrid: (cellsMatrixSize: cc.Size) => void;
    public abstract init(): void;    
    public abstract setupCellToMatrix(row: number, col: number, cell: CellBase): void;
    public abstract cellClick(cell: CellBase): void;
}
