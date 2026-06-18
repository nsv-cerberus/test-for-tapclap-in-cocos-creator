const {ccclass, executeInEditMode, menu} = cc._decorator;

@ccclass
@executeInEditMode()
export default class EditorBase extends cc.Component {
    protected onEnable(): void {
        if (!CC_EDITOR) {
            this.enabled = false;
            return;
        }
    }
}
