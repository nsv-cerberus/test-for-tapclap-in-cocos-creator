const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class ValidatableComponent extends cc.Component {

    /* protected onLoad(): void {
        this.validate();
    } */

    protected abstract onValidate(): void;
    
}
