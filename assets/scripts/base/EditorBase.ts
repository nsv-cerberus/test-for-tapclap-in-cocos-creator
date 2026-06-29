const {ccclass, executeInEditMode, menu} = cc._decorator;

@ccclass
@menu("Level/Base/Editor Base")
@executeInEditMode()
export default class EditorBase extends cc.Component {
    protected onLoad(): void {
        if (!CC_EDITOR || CC_PREVIEW) {
            this.enabled = false;
        }
    }

    protected getScene(): cc.Scene {
        return cc.director.getScene();
    }
}
