const {ccclass} = cc._decorator;

import { TileType } from "./Tile";

@ccclass
export default abstract class TileBase extends cc.Component {
    public abstract setType(type: TileType): void;
}