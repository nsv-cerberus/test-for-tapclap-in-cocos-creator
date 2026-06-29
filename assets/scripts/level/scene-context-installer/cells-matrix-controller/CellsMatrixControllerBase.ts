import CellBase from "../../gameplay-field/grid/cell/CellBase";

const {ccclass} = cc._decorator;

@ccclass
export default abstract class CellsMatrixControllerBase extends cc.Component {
    public abstract init(): void;    
    public abstract setupCellToMatrix(row: number, col: number, cell: CellBase): void;
    public abstract cellClick(cell: CellBase): void;
    public abstract onInitGrid: (cellsMatrixSize: cc.Size) => void;
    public abstract onBlockInput(): () => void;
    public abstract onUnblockInput(): () => void;
}
