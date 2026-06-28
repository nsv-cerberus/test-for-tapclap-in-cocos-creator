import CellBase from "../../../gameplay-field/grid/cell/CellBase";

export default interface IChainCollectorService {
    collectChains(cell: CellBase): CellBase[];
}