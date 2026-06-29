import IScoresManager from "./IScoresManager";

export default class ScoresManager implements IScoresManager {

    private readonly minScores: number = 0;
    private readonly tileScore: number = 0;
    private scores: number = 0;

    constructor(minScores: number, tileScore: number) {
        this.minScores = minScores;
        this.tileScore = tileScore;
        this.reset();
    }

    public reset(): void {
        this.scores = 0;
    }

    public scoresAdded(tilesCount: number): boolean {
        const scores = tilesCount * this.tileScore;

        if (scores <= 0) {
            return false;
        }

        this.scores += scores;
        return true;
    }

    public isEnoughScores(): boolean {
        return this.scores >= this.minScores;
    }

    public getScores(): number {
        return this.scores;
    }

    public getMinScores(): number {
        return this.minScores;
    }

}
