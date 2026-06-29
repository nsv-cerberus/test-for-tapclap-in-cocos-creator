import CellBase from "../../../../gameplay-field/grid/cell/CellBase";

export default interface ITilesAlgorithm {
    collect(cell: CellBase): CellBase[][];
}
