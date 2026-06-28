const { ccclass } = cc._decorator;

import ObjectPoolManager from "./PoolManager";

@ccclass
export default class Poolable extends cc.Component {
    private poolManager: ObjectPoolManager = null;
    private poolKey: string = "";

    public initPool(poolManager: ObjectPoolManager, poolKey: string): void {
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