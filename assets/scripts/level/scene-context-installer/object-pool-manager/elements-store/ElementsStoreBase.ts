export default abstract class ElementsStoreBase extends cc.Component {    
    public abstract getPrefab(componentClass: Function): cc.Prefab;
}