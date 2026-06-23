const {ccclass, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode()
export default class EditorBase extends cc.Component {
    protected onLoad(): void {
        if (!CC_EDITOR) {
            this.enabled = false;
        }
    }

    protected getScene(): cc.Scene {
        return cc.director.getScene();
    }
}
