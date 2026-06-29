import CellBase from "../../../gameplay-field/grid/cell/CellBase";

export default interface IElementsDestroyService {
    destroyCellsElements(chainSteps: CellBase[][]): Promise<CellBase[]>;
}
