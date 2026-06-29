export default interface IStepsManager {
    reset(): void;
    stepWasted(): boolean;
    isEmpty(): boolean;
    getSteps(): number;
    getMaxSteps(): number;
}
