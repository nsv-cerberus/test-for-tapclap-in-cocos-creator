export default interface IScoresManager {
    reset(): void;
    scoresAdded(tilesCount: number): boolean;
    isEnoughScores(): boolean;
    getScores(): number;
    getMinScores(): number;
}
