const {ccclass, property} = cc._decorator;

import TileBase from "./TileBase";

export enum TileType {
    Red,
    Green,
    Blue,
    Yellow,
    Purple,
}

@ccclass
export default class Tile extends TileBase {

    private type: TileType = TileType.Blue;

    @property(cc.Sprite)
    private blue: cc.Sprite = null;

    @property(cc.Sprite)
    private red: cc.Sprite = null;

    @property(cc.Sprite)
    private green: cc.Sprite = null;

    @property(cc.Sprite)
    private yellow: cc.Sprite = null;

    @property(cc.Sprite)
    private purple: cc.Sprite = null;

    public setType(type: TileType): void {
        this.type = type;
        this.enableSpriteByType();
    }

    private enableSpriteByType(): void {
        this.disableAllSprites();

        switch (this.type) {
            case TileType.Blue:
                this.enableSprite(this.blue);
                break;
            case TileType.Red:
                this.enableSprite(this.red);
                break;
            case TileType.Green:
                this.enableSprite(this.green);
                break;
            case TileType.Yellow:
                this.enableSprite(this.yellow);
                break;
            case TileType.Purple:
                this.enableSprite(this.purple);
                break;
            default:
                cc.warn("Tile: Unknown type");
                break;
        }
    }

    private disableAllSprites(): void {
        this.disableSprite(this.blue);
        this.disableSprite(this.red);
        this.disableSprite(this.green);
        this.disableSprite(this.yellow);
        this.disableSprite(this.purple);
    }

    private enableSprite(sprite: cc.Sprite): void {
        sprite.node.active = true;
    }

    private disableSprite(sprite: cc.Sprite): void {
        sprite.node.active = false;
    }

    public getType(): TileType {
        return this.type;
    }
    
}