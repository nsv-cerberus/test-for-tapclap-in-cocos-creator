const {ccclass, menu} = cc._decorator;

@ccclass
@menu("Level/Scene Context Installer/Object Pool Manager/Prefabs Store Base")
export default abstract class PrefabsStoreBase extends cc.Component {    
    public abstract getPrefab(componentClass: Function): cc.Prefab;
}
