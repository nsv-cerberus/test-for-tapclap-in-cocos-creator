const {ccclass, menu} = cc._decorator;

@ccclass
@menu("Level/Base/Validatable Component")
export default abstract class ValidatableComponent extends cc.Component {

    /* protected onLoad(): void {
        this.validate();
    } */

    protected abstract onValidate(): void;
    
}
