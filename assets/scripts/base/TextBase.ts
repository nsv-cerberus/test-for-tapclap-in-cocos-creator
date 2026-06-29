const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class TextBase extends cc.Component {

    @property(cc.RichText)
    protected text: cc.RichText = null;
    protected label: cc.Label = null;

    onLoad() {
        if (!this.text) {
            this.text = this.getComponent(cc.RichText);
        }

        if (!this.label) {
            this.label = this.getComponent(cc.Label);
        }

        this.setText("00/0000");
    }

    protected setText(value: string): void {
        if (this.text) {
            this.text.string = value;
        }

        if (this.label) {
            this.label.string = value;
        }
    }

}
