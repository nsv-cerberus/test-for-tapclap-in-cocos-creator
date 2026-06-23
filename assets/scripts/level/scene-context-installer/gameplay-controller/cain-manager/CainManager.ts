import Cell from "../../../level/grid/cell/Cell";
import ICainManager from "./ICainManager";

export default class CainManager implements ICainManager {

    private cains: Cell[][] = null;

    destroy(): void {
        this.cains = null;
    }

}
