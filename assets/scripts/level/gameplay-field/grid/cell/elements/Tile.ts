const {ccclass, property} = cc._decorator;

import ElementBase from "./ElementBase";

export enum TileType {
    Red,
    Green,
    Blue,
    Yellow,
    Purple,
}

@ccclass
export default class Tile extends ElementBase {

    private type: TileType = TileType.Blue;

    @property(cc.Sprite)
    private red: cc.Sprite = null;

    @property(cc.Sprite)
    private green: cc.Sprite = null;

    @property(cc.Sprite)
    private blue: cc.Sprite = null;

    @property(cc.Sprite)
    private yellow: cc.Sprite = null;

    @property(cc.Sprite)
    private purple: cc.Sprite = null;

    onEnable() {
        this.defineRandomeType();
        this.resAnimation();
    }

    private defineRandomeType() {
        const types = Object.values(TileType).filter(value => typeof value === "number") as TileType[];
        const randomIndex = Math.floor(Math.random() * types.length);
        this.setTileType(types[randomIndex]);
    }

    private setTileType(type: TileType): void {
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
                cc.error("Tile: Unknown type");
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

    public getType(): ElementBase {
        return this;
    }

    public getTileType(): TileType {
        return this.type;
    }

    public resAnimation(): void {
        cc.Tween.stopAllByTarget(this.node);

        this.node.opacity = 0;
        this.node.scale = 0.6;

        cc.tween(this.node)
            .to(0.12, { opacity: 255, scale: 1.08 }, { easing: "backOut" })
            .to(0.06, { scale: 1 })
            .start();
    }

    public destroyAnimation(delay: number = 0): Promise<void> {
        return new Promise<void>((resolve) => {
            cc.Tween.stopAllByTarget(this.node);

            cc.tween(this.node)
                .delay(delay)
                .to(0.08, { scale: 1.18 }, { easing: "sineOut" })
                .to(0.14, { opacity: 0, scale: 0.15, angle: this.node.angle + 25 }, { easing: "quadIn" })
                .call(() => {
                    this.node.opacity = 255;
                    this.node.scale = 1;
                    this.node.angle = 0;
                    resolve();
                })
                .start();
        });
    }
    
}
