const {ccclass} = cc._decorator;

@ccclass
export default abstract class PrefabsStoreBase extends cc.Component {    
    public abstract getPrefab(componentClass: Function): cc.Prefab;
}
