import Cell from "../../../level/grid/cell/Cell";

export default interface ISpawnService {
    spawn(cells: Cell[]): void;
}