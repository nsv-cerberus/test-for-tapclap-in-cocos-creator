import IElementsDestroyService from "./IElementsDestroyService";
import SceneContext from "../../SceneContext";
import ObjectPoolManager from "../../object-pool-manager/ObjectPoolManager";
import CellBase from "../../../gameplay-field/grid/cell/CellBase";
import ElementBase from "../../../gameplay-field/grid/cell/elements/ElementBase";

export default class ElementsDestroyService implements IElementsDestroyService {
    private poolManager: ObjectPoolManager;

    constructor() {
        this.poolManager = SceneContext.get(ObjectPoolManager);
    }

    public async destroyCellsElements(chainSteps: CellBase[][]): Promise<CellBase[]> {
        const destroyAnimations: Promise<CellBase>[] = [];

        for (const cells of chainSteps) {
            if (!cells) {
                continue;
            }

            for (const cell of cells) {
                const element = cell.getElement();

                if (!element) {
                    continue;
                }

                destroyAnimations.push(this.destroyCellElement(cell, element));
            }
        }

        return Promise.all(destroyAnimations);
    }

    private destroyCellElement(cell: CellBase, element: ElementBase): Promise<CellBase> {
        return element.destroyAnimation()
            .then(() => {
                cell.removeElement(element);
                this.poolManager.release(ElementBase.name, element.node);
                return cell;
            });
    }
}
