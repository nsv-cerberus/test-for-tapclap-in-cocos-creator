const { ccclass } = cc._decorator;

import PoolManagerController from "./PoolManager";

@ccclass
export default class Poolable extends cc.Component {
    private poolManager: PoolManagerController = null;
    private poolKey: string = "";

    public initPool(poolManager: PoolManagerController, poolKey: string): void {
        this.poolManager = poolManager;
        this.poolKey = poolKey;
    }

    public release(): void {
        if (!this.poolManager) {
            cc.warn(`[Poolable] PoolManager is not assigned for ${this.node.name}`);
            return;
        }

        this.poolManager.release(this.poolKey, this.node);
    }

    public onSpawn(): void {
        // переопределяешь в наследниках
    }

    public onDespawn(): void {
        // переопределяешь в наследниках
    }
}