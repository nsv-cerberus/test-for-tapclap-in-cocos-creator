import IElementsDestroyService from "./IElementsDestroyService";
import SceneContext from "../../SceneContext";
import ObjectPoolManager from "../../object-pool-manager/ObjectPoolManager";
import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import ElementBase from "../../../gameplay-field/grid/cell/elements/ElementBase";

export default class ElementsDestroyService implements IElementsDestroyService {
    private readonly waveStepDelay: number = 0.055;
    private poolManager: ObjectPoolManager;

    constructor() {
        this.poolManager = SceneContext.get(ObjectPoolManager);
    }

    public async destroyCellsElements(chainSteps: CellBase[][]): Promise<void> {
        let animationsCounter = 0;

        return new Promise<void>((resolve) => {
            const onAnimationComplete = () => {
                animationsCounter--;

                if (animationsCounter <= 0) {
                    resolve();
                }
            };

            for (let step = 0; step < chainSteps.length; step++) {
                const cells = chainSteps[step];

                if (!cells) {
                    continue;
                }

                for (const cell of cells) {
                    const element = cell.getElement();

                    if (!element) {
                        continue;
                    }

                    animationsCounter++;
                    this.destroyCellElement(cell, element, step)
                        .then(onAnimationComplete);
                }
            }

            if (animationsCounter === 0) {
                resolve();
            }
        });
    }

    private destroyCellElement(cell: CellBase, element: ElementBase, step: number): Promise<void> {
        return element.destroyAnimation(step * this.waveStepDelay)
            .then(() => {
                cell.removeElement(element);
                this.poolManager.release(ElementBase.name, element.node);
            });
    }
}
