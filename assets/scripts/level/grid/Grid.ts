const {ccclass, executeInEditMode, property} = cc._decorator;

@ccclass
@executeInEditMode
export default class Grid extends cc.Component {
    _cols: number = 2;
    _rows: number = 2;
    _cellSize: cc.Size = cc.size(100, 112);
    _spaceBetweenCells: number = 0;

    /* SET / GET - COLUMNS */
    @property({
        type: cc.Integer,
        tooltip: "Количество ячеек по ширине",
        min: 2,
        max: 9,
    })
    public get cols(): number {
        return this._cols;
    }

    set cols(value: number) {
        this._cols = value;
        this.rebuildColumns();
    }

    /* SET / GET - ROWS */
    @property({
        type: cc.Integer,
        tooltip: "Количество ячеек по высоте",
        min: 2,
        max: 14,
    })
    public get rows(): number {
        return this._rows;
    }

    set rows(value: number) {
        this._rows = value;
        this.rebuildRows();
    }

    /* SET / GET - CELL SIZE */
    @property({
        type: cc.Size,
        tooltip: "Размер ячейки"
    })
    public get cellSize(): cc.Size {
        return this._cellSize;
    }

    set cellSize(value: cc.Size) {
        this._cellSize = value;

        this.rebuildGrid();
    }
    
    /* SET / GET - SPACE BETWEEN CELLS */
    @property({
        type: cc.Integer,
        tooltip: "Расстояние между ячейками",
        min: 0,
        max: 50,
    })
    public get spaceBetweenCells(): number {
        return this._spaceBetweenCells;
    }

    set spaceBetweenCells(value: number) {
        this._spaceBetweenCells = value;
        this.rebuildGrid();
    }
    
    onValidate(): void {
        cc.warn("onValidate called");
        this.rebuildGrid();
    }

    onLoad(): void {
        
    }

    rebuildColumns(): void {
        this.node.width = this.cols * this.cellSize.width + (this.cols - 1) + this.spaceBetweenCells * (this.cols - 1);
    }

    rebuildRows(): void {
        this.node.height = this.rows * this.cellSize.height + (this.rows - 1) + this.spaceBetweenCells * (this.rows - 1);
    }

    rebuildGrid(): void {
        this.rebuildColumns();
        this.rebuildRows();
    }

}