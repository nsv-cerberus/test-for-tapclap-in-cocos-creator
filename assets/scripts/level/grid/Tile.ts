const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends cc.Component {

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
