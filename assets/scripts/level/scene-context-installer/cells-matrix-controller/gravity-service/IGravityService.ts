import CellBase from "../../../gameplay-field/grid/cell/CellBase";

export default interface IGravityService {
    fall(cells: CellBase[]): Promise<void>;
}
