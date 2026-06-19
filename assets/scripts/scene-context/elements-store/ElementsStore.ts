const {ccclass, property} = cc._decorator;

import IService from "../IService";
import Tile from "../../level/grid/Tile";

@ccclass
export default class ElementsStore extends cc.Component implements IService {

    @property(cc.Prefab)
    private tilePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private rocketsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private bombPrefab: cc.Prefab = null;
    
    public getTilePrefab(): cc.Prefab {
        return this.tilePrefab;
    }
}