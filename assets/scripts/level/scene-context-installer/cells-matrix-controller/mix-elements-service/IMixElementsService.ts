import CellBase from "../../../gameplay-field/grid/cell/CellBase";

export default interface IMixElementsService {
    init(cellsMatrix: CellBase[][]): void;
    mix(): Promise<void>;
}
