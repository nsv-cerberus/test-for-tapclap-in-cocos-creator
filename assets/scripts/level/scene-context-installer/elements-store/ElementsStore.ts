const {ccclass, property, menu} = cc._decorator;

import IService from "../IService";

@ccclass
@menu("Level/Scene Context Installer/Stores/Elements Store")
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