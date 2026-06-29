import IGravityService from "./IGravityService";
import ICellsMatrix from "../cells-matrix/ICellsMatrix";
import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import ElementBase from "../../../gameplay-field/grid/cell/elements/ElementBase";

type FallMove = {
    element: ElementBase;
    toCell: CellBase;
    distance: number;
};

export default class GravityService implements IGravityService {

    private readonly fallDurationPerCell: number = 0.25;
    private readonly bounceDuration: number = 0.08;
    private readonly bounceHeightRatio: number = 0.18;
    private cellsMatrix: ICellsMatrix;

    constructor(cellsMatrix: ICellsMatrix) {
        this.cellsMatrix = cellsMatrix;
    }

    public async fall(cells: CellBase[]): Promise<void> {
        if (!cells || cells.length === 0) {
            return;
        }

        const moves = this.collectFallMoves();

        if (moves.length === 0) {
            return;
        }

        await Promise.all(moves.map(move => this.playFallAnimation(move)));
    }

    private collectFallMoves(): FallMove[] {
        const moves: FallMove[] = [];
        const matrix = this.cellsMatrix.getMatrix();

        for (let col = 0; col < this.getColsCount(matrix); col++) {
            let targetRow = matrix.length - 1;

            for (let row = matrix.length - 1; row >= 0; row--) {
                const fromCell = matrix[row] ? matrix[row][col] : null;

                if (!fromCell) {
                    continue;
                }

                const element = fromCell.getElement();

                if (!element) {
                    continue;
                }

                const toCell = matrix[targetRow][col];

                if (fromCell !== toCell) {
                    moves.push(this.moveElementToCell(element, fromCell, toCell, targetRow - row));
                }

                targetRow--;
            }
        }

        return moves;
    }

    private moveElementToCell(
        element: ElementBase,
        fromCell: CellBase,
        toCell: CellBase,
        distance: number
    ): FallMove {
        const startPosition = this.getWorldPosition(element.node);

        toCell.addElement(element);
        element.node.position = element.node.parent.convertToNodeSpaceAR(startPosition);
        fromCell.removeElement(element);

        return {
            element,
            toCell,
            distance
        };
    }

    private playFallAnimation(move: FallMove): Promise<void> {
        return new Promise<void>((resolve) => {
            const node = move.element.node;
            const targetPosition = cc.v3(0, 0, 0);
            const bounceHeight = this.getCellHeight(move.toCell) * this.bounceHeightRatio;
            const bouncePosition = cc.v3(0, bounceHeight, 0);

            cc.Tween.stopAllByTarget(node);

            cc.tween(node)
                .to(move.distance * this.fallDurationPerCell, { position: targetPosition }, { easing: "sineIn" })
                .to(this.bounceDuration, { position: bouncePosition }, { easing: "sineOut" })
                .to(this.bounceDuration, { position: targetPosition }, { easing: "sineIn" })
                .call(resolve)
                .start();
        });
    }

    private getWorldPosition(node: cc.Node): cc.Vec3 {
        return node.parent.convertToWorldSpaceAR(node.position);
    }

    private getCellHeight(cell: CellBase): number {
        return cell.node ? cell.node.height : 0;
    }

    private getColsCount(matrix: CellBase[][]): number {
        return matrix.length > 0 && matrix[0] ? matrix[0].length : 0;
    }

}
