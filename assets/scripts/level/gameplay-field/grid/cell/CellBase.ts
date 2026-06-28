import ElementBase from "./elements/ElementBase";

export default abstract class CellBase extends cc.Component {
    public abstract setPositionInMatrix(row: number, col: number): CellBase;
    public abstract getPositionInMatrix(): { row: number, col: number };
    public abstract getElement(): ElementBase;
    public abstract addElement(element: ElementBase): void;
    public abstract removeElement(element: ElementBase): void;
}
