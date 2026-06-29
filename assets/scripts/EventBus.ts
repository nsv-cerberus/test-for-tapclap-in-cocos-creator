export enum LevelEvent {
    LevelSettingsReady = "LevelSettingsReady",
    GridInitialized = "GridInitialized",
}

export enum GameplayEvent {
    NewGame = "NewGame",
    StepsUpdated = "StepsUpdated",
    ScoresUpdated = "ScoresUpdated",
    MixBoostersUpdated = "MixBoostersUpdated",
    GameOver = "GameOver",
    Won = "Won",
}

export type EventType = LevelEvent | GameplayEvent;

export default class EventBus {
    private static readonly _target = new cc.EventTarget();

    public static on(
        event: EventType,
        callback: Function,
        target?: any
    ): void {
        this._target.on(event, callback, target);
    }

    public static off(
        event: EventType,
        callback: Function,
        target?: any
    ): void {
        this._target.off(event, callback, target);
    }

    public static emit(
        event: EventType,
        ...args: any[]
    ): void {
        this._target.emit(event, ...args);
    }

    public static targetOff(
        target: any
    ): void {
        this._target.targetOff(target);
    }
}
