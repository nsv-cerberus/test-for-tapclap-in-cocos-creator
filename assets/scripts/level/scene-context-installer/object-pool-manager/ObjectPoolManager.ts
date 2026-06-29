const { ccclass, property, menu } = cc._decorator;

import PrefabsStoreBase from "./prefabs-store/PrefabsStoreBase";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Object Pool Manager Controller")
export default class ObjectPoolManager extends cc.Component {

    @property(PrefabsStoreBase)
    private prefabsStore: PrefabsStoreBase = null;

    private pools: Map<string, cc.NodePool> = new Map();

    onLoad() {
        this.resolvePrefabsStore();
    }

    public release(key: string, node: cc.Node): void {
        const pool = this.getOrCreatePool(key);

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

    public get<T extends cc.Component>(componentClass: any, poolClass: any = componentClass): T {

        if (!componentClass) {
            cc.error("ObjectPoolManager: Component class is not assigned!");
            return null;
        }

        if (!this.resolvePrefabsStore()) {
            cc.error("ObjectPoolManager: PrefabsStore is not assigned!");
            return null;
        }

        const prefab = this.prefabsStore.getPrefab(componentClass);

        if (!prefab) {
            cc.error(`ObjectPoolManager: Prefab for ${componentClass.name} is not assigned!`);
            return null;
        }

        const pool = this.getOrCreatePool(this.getPoolKey(poolClass));

        const node = pool.size() > 0
            ? pool.get()
            : cc.instantiate(prefab);

        node.active = true;

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

    private getPoolKey(poolClass: any): string {
        return poolClass && poolClass.name ? poolClass.name : String(poolClass);
    }

    private resolvePrefabsStore(): PrefabsStoreBase {
        if (!this.prefabsStore) {
            this.prefabsStore = this.getComponentInChildren(PrefabsStoreBase);
        }

        return this.prefabsStore;
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
