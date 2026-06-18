const {ccclass, property} = cc._decorator;

export enum TileType {
    Red,
    Green,
    Blue,
    Yellow,
    Purple,
}

@ccclass
export default class Tile extends cc.Component {

    _type: TileType = TileType.Blue;

    onLoad () {
        this.defineRandomeType();
    }

    defineRandomeType(): void {
        const randomIndex = Math.floor(Math.random() * Object.keys(TileType).length / 2);
        this.type = randomIndex;
    }

    public get type(): TileType {
        return this._type;
    }

    set type(value: TileType) {
        this._type = value;
    }
    
}