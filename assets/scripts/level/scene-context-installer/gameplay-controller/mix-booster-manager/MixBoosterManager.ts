import IMixBoosterManager from "./IMixBoosterManager";

export default class MixBoosterManager implements IMixBoosterManager {

    private readonly initialCount: number = 0;
    private count: number = 0;

    constructor(initialCount: number) {
        this.initialCount = Math.max(0, initialCount);
        this.reset();
    }

    public reset(): void {
        this.count = this.initialCount;
    }

    public use(): boolean {
        if (this.count <= 0) {
            return false;
        }

        this.count--;
        return true;
    }

    public getCount(): number {
        return this.count;
    }

}
