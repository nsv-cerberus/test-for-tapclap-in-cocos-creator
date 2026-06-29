const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("Level/Base/Text Base")
export default abstract class TextBase extends cc.Component {

    @property(cc.RichText)
    protected text: cc.RichText = null;

    onLoad() {
        if (!this.text) {
            this.text = this.getComponent(cc.RichText);
        }

        this.setText("00/0000");
    }

    protected setText(value: string): void {
        if (this.text) {
            this.text.string = value;
        }
    }

}
