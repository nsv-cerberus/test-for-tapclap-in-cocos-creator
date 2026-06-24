import Cell from "../../../gameplay-field/grid/cell/Cell";

export default interface ISpawnService {
    spawn(emptyCells: Cell[]): void;
}