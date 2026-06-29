import IMixElementsService from "./IMixElementsService";
import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import ElementBase from "../../../gameplay-field/grid/cell/elements/ElementBase";

type MixItem = {
    cell: CellBase;
    element: ElementBase;
    worldPosition: cc.Vec3;
};

export default class MixElementsService implements IMixElementsService {
    private readonly mixDuration: number = 0.35;
    private cellsMatrix: CellBase[][];

    public init(cellsMatrix: CellBase[][]): void {
        this.cellsMatrix = cellsMatrix;
    }

    public async mix(): Promise<void> {
        const mixItems = this.collectMixItems();

        if (mixItems.length <= 1) {
            return;
        }

        const shuffledElements = this.shuffleElements(mixItems.map(item => item.element));
        this.resolveSamePositions(mixItems, shuffledElements);

        for (const item of mixItems) {
            item.cell.removeElement(item.element);
        }

        await Promise.all(mixItems.map((item, index) => {
            const element = shuffledElements[index];
            return this.moveElementToCell(element, item.cell, this.getOriginalWorldPosition(mixItems, element));
        }));
    }

    private collectMixItems(): MixItem[] {
        const mixItems: MixItem[] = [];

        if (!this.cellsMatrix) {
            return mixItems;
        }

        for (let row = 0; row < this.cellsMatrix.length; row++) {
            const matrixRow = this.cellsMatrix[row];

            if (!matrixRow) {
                continue;
            }

            for (let col = 0; col < matrixRow.length; col++) {
                const cell = matrixRow[col];

                if (!cell) {
                    continue;
                }

                const element = cell.getElement();

                if (!element) {
                    continue;
                }

                mixItems.push({
                    cell,
                    element,
                    worldPosition: this.getWorldPosition(element.node)
                });
            }
        }

        return mixItems;
    }

    private shuffleElements(elements: ElementBase[]): ElementBase[] {
        const shuffledElements = elements.slice();

        for (let i = shuffledElements.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const element = shuffledElements[i];
            shuffledElements[i] = shuffledElements[randomIndex];
            shuffledElements[randomIndex] = element;
        }

        return shuffledElements;
    }

    private resolveSamePositions(mixItems: MixItem[], shuffledElements: ElementBase[]): void {
        for (let i = 0; i < shuffledElements.length; i++) {
            if (shuffledElements[i] !== mixItems[i].element) {
                continue;
            }

            const swapIndex = i === shuffledElements.length - 1 ? 0 : i + 1;
            const element = shuffledElements[i];
            shuffledElements[i] = shuffledElements[swapIndex];
            shuffledElements[swapIndex] = element;
        }
    }

    private moveElementToCell(element: ElementBase, cell: CellBase, fromWorldPosition: cc.Vec3): Promise<void> {
        cell.addElement(element);
        element.node.position = element.node.parent.convertToNodeSpaceAR(fromWorldPosition);

        return new Promise<void>((resolve) => {
            cc.Tween.stopAllByTarget(element.node);

            cc.tween(element.node)
                .to(this.mixDuration, { position: cc.v3(0, 0, 0) }, { easing: "sineInOut" })
                .call(resolve)
                .start();
        });
    }

    private getWorldPosition(node: cc.Node): cc.Vec3 {
        return node.parent.convertToWorldSpaceAR(node.position);
    }

    private getOriginalWorldPosition(mixItems: MixItem[], element: ElementBase): cc.Vec3 {
        for (const item of mixItems) {
            if (item.element === element) {
                return item.worldPosition;
            }
        }

        return cc.v3(0, 0, 0);
    }
}
