const {ccclass} = cc._decorator;

@ccclass
export default abstract class CellsMatrixControllerBase extends cc.Component {
    public abstract init(poolManager: any, levelSettings: any): void;
    public abstract getSizeMatrix(): cc.Size;
    public abstract setupCellToMatrix(row: number, col: number, cell: any): void;
}
