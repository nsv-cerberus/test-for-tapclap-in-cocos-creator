const {ccclass, menu} = cc._decorator;

import EventBus, { GameplayEvent, LevelEvent } from "../../../EventBus";
import SceneContext from "../SceneContext";
import LevelSettings from "../level-settings/LevelSettings";
import GameplayControllerBase, { GameplayState } from "./GameplayControllerBase";
import IStepsManager from "./steps-manager/IStepsManager";
import StepsManager from "./steps-manager/StepsManager";
import IScoresManager from "./scores-manager/IScoresManager";
import ScoresManager from "./scores-manager/ScoresManager";

@ccclass
@menu("Level/Scene Context Installer/Controllers/Gameplay Controller")
export default class GameplayController extends GameplayControllerBase {

    private stepsManager: IStepsManager = null;
    private scoresManager: IScoresManager = null;
    private state: GameplayState = GameplayState.Playing;

    onLoad() {
        EventBus.on(LevelEvent.GridInitialized, this.onNewGame, this);
    }

    public init(): void {
        const levelSettings = SceneContext.get(LevelSettings);

        this.stepsManager = new StepsManager(levelSettings.getMaxSteps());
        this.scoresManager = new ScoresManager(levelSettings.getMinScores(), levelSettings.getTileScore());
        this.startNewGame();

        EventBus.emit(GameplayEvent.NewGame, this);
    }

    private onNewGame(): void {
        if (!this.stepsManager || !this.scoresManager) {
            return;
        }

        this.stepsManager.reset();
        this.scoresManager.reset();
        this.startNewGame();

        EventBus.emit(GameplayEvent.NewGame, this);
    }

    public startMove(tilesCount: number): void {
        if (!this.stepsManager || !this.scoresManager || !this.isPlaying()) {
            return;
        }

        this.blockInput();

        if (this.scoresManager.scoresAdded(tilesCount)) {
            this.emitScoresUpdated();
        }

        if (this.stepsManager.stepWasted()) {
            this.emitStepsUpdated();
        }
    }

    public finishMove(hasAvailableMoves: boolean): void {
        if (!this.stepsManager || !this.scoresManager || !this.isPlaying()) {
            return;
        }

        if (this.scoresManager.isEnoughScores()) {
            this.complete(GameplayState.Won, GameplayEvent.Won);
            return;
        }

        if (this.stepsManager.isEmpty() || !hasAvailableMoves) {
            this.complete(GameplayState.GameOver, GameplayEvent.GameOver);
            return;
        }

        this.unblockInput();
    }

    public getState(): GameplayState {
        return this.state;
    }

    public isPlaying(): boolean {
        return this.state === GameplayState.Playing;
    }

    public getSteps(): number {
        return this.stepsManager ? this.stepsManager.getSteps() : 0;
    }

    public getMaxSteps(): number {
        return this.stepsManager ? this.stepsManager.getMaxSteps() : 0;
    }

    public getScores(): number {
        return this.scoresManager ? this.scoresManager.getScores() : 0;
    }

    public getMinScores(): number {
        return this.scoresManager ? this.scoresManager.getMinScores() : 0;
    }

    private startNewGame(): void {
        this.state = GameplayState.Playing;
        this.unblockInput();
        this.emitStatisticsUpdated();
    }

    private blockInput(): void {
        if (this.onBlockInput) {
            this.onBlockInput();
        }
    }

    private unblockInput(): void {
        if (this.onUnblockInput) {
            this.onUnblockInput();
        }
    }

    private complete(state: GameplayState, event: GameplayEvent): void {
        this.state = state;
        EventBus.emit(event, this);
    }

    private emitStatisticsUpdated(): void {
        this.emitStepsUpdated();
        this.emitScoresUpdated();
    }

    private emitStepsUpdated(): void {
        EventBus.emit(
            GameplayEvent.StepsUpdated,
            this.stepsManager.getSteps(),
            this.stepsManager.getMaxSteps()
        );
    }

    private emitScoresUpdated(): void {
        EventBus.emit(
            GameplayEvent.ScoresUpdated,
            this.scoresManager.getScores(),
            this.scoresManager.getMinScores()
        );
    }

    onDisable() {
        EventBus.targetOff(this);
    }

}
