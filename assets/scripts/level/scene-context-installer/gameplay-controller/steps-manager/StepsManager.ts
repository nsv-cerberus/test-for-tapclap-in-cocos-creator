import IStepsManager from "./IStepsManager";

export default class StepsManager implements IStepsManager {

    private readonly maxSteps: number = 0;
    private steps: number = 0;

    constructor(maxSteps: number) {
        this.maxSteps = maxSteps;
        this.reset();
    }

    public reset(): void {
        this.steps = this.maxSteps;
    }

    public stepWasted(): boolean {
        if (this.steps <= 0) {
            return false;
        }

        this.steps--;
        return true;
    }

    public isEmpty(): boolean {
        return this.steps <= 0;
    }

    public getSteps(): number {
        return this.steps;
    }

    public getMaxSteps(): number {
        return this.maxSteps;
    }

}
