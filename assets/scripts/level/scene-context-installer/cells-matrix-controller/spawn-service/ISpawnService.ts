import CellBase from "../../../gameplay-field/grid/cell/CellBase";

export default interface ISpawnService {
    spawnTails(emptyCells: CellBase[]): void;
}