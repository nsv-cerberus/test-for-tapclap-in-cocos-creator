const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends cc.Component {
    @property
    value: number = 0;

    private _lastValue: number = null;

    update(): void {
        if (!CC_EDITOR) {
            return;
        }

        if (this._lastValue === this.value) {
            return;
        }

        this._lastValue = this.value;

        /* cc.warn("VALUE CHANGED:", this.value); */
    }
}