const { ccclass, menu } = cc._decorator;

import ElementsStore from "../elements-store/ElementsStore";
import Poolable from "./Poolable";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Pool Manager Controller")
export default class PoolManager extends cc.Component {

    private elementsStore: ElementsStore = null;
    private pools: Map<string, cc.NodePool> = new Map();

    public init(elementsStore: ElementsStore): void {
        this.elementsStore = elementsStore;
    }

    public release(key: string, node: cc.Node): void {
        const pool = this.getOrCreatePool(key);

        const poolable = node.getComponent(Poolable);

        if (poolable) {
            poolable.onDespawn();
        }

        node.active = false;
        pool.put(node);
    }

    public clear(key: string): void {
        const pool = this.pools.get(key);

        if (!pool) {
            return;
        }

        pool.clear();
        this.pools.delete(key);
    }

    public get(key: string, prefab: cc.Prefab, parent: cc.Node): cc.Node {
        const pool = this.getOrCreatePool(key);

        const node = pool.size() > 0
            ? pool.get()
            : cc.instantiate(prefab);

        parent.addChild(node);
        node.active = true;

        const poolable = node.getComponent(Poolable);

        if (poolable) {
            poolable.initPool(this, key);
            poolable.onSpawn();
        }

        return node;
    }

    public clearAll(): void {
        this.pools.forEach((pool: cc.NodePool) => {
            pool.clear();
        });

        this.pools.clear();
    }

    public hasPool(key: string): boolean {
        return this.pools.has(key);
    }

    public getPoolSize(key: string): number {
        const pool = this.pools.get(key);
        return pool ? pool.size() : 0;
    }

    private getOrCreatePool(key: string): cc.NodePool {
        let pool = this.pools.get(key);

        if (!pool) {
            pool = new cc.NodePool();
            this.pools.set(key, pool);
        }

        return pool;
    }

    protected onDestroy(): void {
        this.clearAll();
    }
    
}