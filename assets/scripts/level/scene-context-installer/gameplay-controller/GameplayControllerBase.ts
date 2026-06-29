export enum GameplayState {
    Playing,
    GameOver,
    Won,
}

export default abstract class GameplayControllerBase extends cc.Component {
    public onBlockInput: () => void = null;
    public onUnblockInput: () => void = null;

    public abstract init(): void;

    public startMove(tilesCount: number): void {}

    public finishMove(hasAvailableMoves: boolean): void {}

    public abstract getState(): GameplayState;
    public abstract isPlaying(): boolean;
    public abstract getSteps(): number;
    public abstract getMaxSteps(): number;
    public abstract getScores(): number;
    public abstract getMinScores(): number;
    public abstract useMixBooster(): boolean;
    public abstract getMixBoosterCount(): number;
}
