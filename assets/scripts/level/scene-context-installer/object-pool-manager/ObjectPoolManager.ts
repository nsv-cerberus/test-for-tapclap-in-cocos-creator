const { ccclass, property, menu } = cc._decorator;

import ElementsStoreBase from "./elements-store/ElementsStoreBase";
import Poolable from "./Poolable";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Object Pool Manager Controller")
export default class ObjectPoolManager extends cc.Component {

    @property(ElementsStoreBase)
    private elementsStore: ElementsStoreBase = null;

    private pools: Map<string, cc.NodePool> = new Map();

    onLoad() {
        if (!this.elementsStore) {
            this.elementsStore = this.getComponentInChildren(ElementsStoreBase);

            if (!this.elementsStore) {
                cc.error("ObjectPoolManager: ElementsStore component is not found in children!");
                return;
            }
        }
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

    public get<T extends cc.Component>(componentClass: any): T {

        const prefab = this.elementsStore.getPrefab(componentClass);
        const pool = this.getOrCreatePool(componentClass.name);

        const node = pool.size() > 0
            ? pool.get()
            : cc.instantiate(prefab);

        node.active = true;

        const poolable = node.getComponent(Poolable);

        if (poolable) {
            poolable.initPool(this, componentClass.name);
            poolable.onSpawn();
        }

        return node.getComponent(componentClass) as T;
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

    public clearAll(): void {
        this.pools.forEach((pool: cc.NodePool) => {
            pool.clear();
        });

        this.pools.clear();
    }

    protected onDestroy(): void {
        this.clearAll();
    }
    
}